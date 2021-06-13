import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { NotificationType } from '../../enum/notification-type.enum';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showLoading: boolean;
  public recaptchaValid: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/mainpage');
    }
  }

  resolved(captchaResponse: string) {
    const googleObj: GoogleRequestDTO = new GoogleRequestDTO(captchaResponse);
    this.subscriptions.push(
      this.authenticationService.postRecaptcha(googleObj).subscribe(
        (response: HttpResponse<any>) => {
          this.recaptchaValid = true;
          console.log("IT WORKED!");
        },
        (errorResponse: any) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  public displayLogin():void {
    this.router.navigate(['/login']);
  }
  public displayMainPage():void {
    this.router.navigate(['/mainpage']);
  }

  public onRegister(user: InterviewUserDTO): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: InterviewUserDTO) => {
          this.showLoading = false;
          this.router.navigateByUrl('/registeremailsent/'+user.emailAddr);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
