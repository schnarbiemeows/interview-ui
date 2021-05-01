import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { NotificationType } from '../../enum/notification-type.enum';
import { HeaderType } from '../../enum/header-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['mainpage']);
    } else {
      this.router.navigate(['login']);
    }
  }

  public displayRegistration():void {
    /*this.showLogin = false;
    this.showRegistration = true;
    this.showMainPage = false;*/
    this.router.navigate(['register']);
  }
  public displayMainPage():void {
    /*this.showLogin = false;
    this.showRegistration = false;
    this.showMainPage = true;*/
    this.router.navigate(['mainpage']);
  }

  public onLogin(user: InterviewUserDTO): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<InterviewUserDTO>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          //
          this.showLoading = false;
          this.router.navigate(['mainpage']);
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
