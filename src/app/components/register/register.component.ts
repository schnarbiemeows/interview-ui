import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { NotificationType } from '../../enum/notification-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/mainpage');
    }
  }

  public displayLogin():void {
    /*this.showLogin = false;
    this.showRegistration = true;
    this.showMainPage = false;*/
    this.router.navigate(['/login']);
  }
  public displayMainPage():void {
    /*this.showLogin = false;
    this.showRegistration = false;
    this.showMainPage = true;*/
    this.router.navigate(['/mainpage']);
  }

  public onRegister(user: InterviewUserDTO): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: InterviewUserDTO) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.
          Please check your email for password to log in.`);
          this.router.navigateByUrl('/mainpage');
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
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
