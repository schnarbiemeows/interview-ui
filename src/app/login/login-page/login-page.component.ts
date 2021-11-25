import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { NotificationType } from '../../enum/notification-type.enum';
import { HeaderType } from '../../enum/header-type.enum';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public showLoading: boolean = false;
  public recaptchaValid: boolean = false;
  public isFormValid: boolean = false;
  public forgotPasswordFormInitiated: boolean = false;
  public forgotUsernameFormInitiated: boolean = false;
  public email: string;
  public btnMsg: string;
  public didntGetEmailMsg:string = "";
  public recoverUsernameMsg = "Recover Username";
  public resendResetPasswordMsg: string = "We've sent an email with a password reset link to the email address below";
  public resendUsernameEmailMsg: string = "We've sent an email with your username to the email address below";
  public didntGetTheEmailMsg: string = "didn't get the email?";
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.forgotUsernameFormInitiated = false;
    this.forgotPasswordFormInitiated = false;
    this.showLoading = false;
    this.recaptchaValid = false;
    this.isFormValid = false;
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['mainpage']);
    } else {
      this.router.navigate(['login']);
    }
  }

  resolved(captchaResponse: string) {
    const googleObj: GoogleRequestDTO = new GoogleRequestDTO(captchaResponse);
    this.subscriptions.push(
      this.authenticationService.postRecaptcha(googleObj).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
          this.recaptchaValid = true;
        },
        (errorResponse: HttpErrorResponse) => {
          this.recaptchaValid = false;
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  /*public displayRegistration():void {
    this.router.navigate(['register']);
  }
  public displayMainPage():void {
    this.router.navigate(['mainpage']);
  }*/

  public onLogin(user: InterviewUserDTO): void {
    if(this.validateForm(user)) {
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
    } else {
      this.sendNotificationMessage(NotificationType.ERROR, 'Please finish filling out the form.');
      this.showLoading = false;
    }
  }


  public onForgotPassword(): void {
    this.didntGetEmailMsg = "";
    this.email = "";
    this.btnMsg = "Reset Password";
    this.forgotPasswordFormInitiated = true;
    this.clickButton('openForgotPassword');
  }

  public onForgotUsername(): void {
    this.didntGetEmailMsg = "";
    this.email = "";
    this.recoverUsernameMsg = "Recover Username";
    this.btnMsg = "Send me my Username";
    this.forgotUsernameFormInitiated = true;
    this.clickButton('openForgotUsername');
  }

  public resetPassword(): void {
    this.forgotPasswordFormInitiated = false;
    this.subscriptions.push(
      this.authenticationService.resetPassword(this.email).subscribe(
        (response: HttpResponse<any>) => {
          this.didntGetEmailMsg = "Didn't get the email?";
          this.btnMsg = "Resend Email";
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public sendUsernameEmail(): void {
    this.forgotPasswordFormInitiated = false;
    this.subscriptions.push(
      this.authenticationService.sendUsernameEmail(this.email).subscribe(
        (response: HttpResponse<any>) => {
          this.recoverUsernameMsg = this.resendUsernameEmailMsg;
          this.didntGetEmailMsg = "Didn't get the email?";
          this.btnMsg = "Resend Email";
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  private validateForm(user: InterviewUserDTO):boolean {
      if(user.userName!=null&&user.userName!=='undefined'&&user.userName!=''&&
        user.password!=null&&user.password!=='undefined'&&user.password!='')
      return true;
      else return false;
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
