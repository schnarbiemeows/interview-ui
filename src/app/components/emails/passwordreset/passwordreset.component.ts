import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../../enum/notification-type.enum";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {CheckResetPasswordResponseDTO} from "../../../models/CheckResetPasswordResponseDTO";
import {PasswordResetDTO} from "../../../models/PasswordResetDTO";
import {ChangePasswordForm} from "../../userinfo/userinfo.component";

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html'
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  saveChangesMsg: string = "Save Changes";
  public code:string;
  private uniqueId:string = null;
  public showErrorMsg:boolean = false;
  public errorMsg:string = '';
  public showResetForm:boolean = false;
  public showLogin:boolean = false;
  public showSuccessMessage:boolean = false;
  public successMsg:string = '';
  public showResendBtn:boolean = false;
  private subscriptions: Subscription[] = [];
  public resetForm:PasswordResetDTO;
  private email:string;

  constructor(private router: Router,private activatedroute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    this.activatedroute.params.subscribe(data => {
      this.code = data.code;
      console.log('code = ' + this.code);
    })
  }

  showAnErrorMessage() {
    this.showErrorMsg = true;
    this.showLogin = false;
    this.showResetForm = false;
    this.showSuccessMessage = false;
    this.showResendBtn = false;
  }

  showTheResetForm() {
    this.showErrorMsg = false;
    this.showLogin = false;
    this.showResetForm = true;
    this.showSuccessMessage = false;
    this.showResendBtn = false;
    this.resetForm = {
      password: null,
      uniqueId: this.uniqueId,
      emailAddress: this.email
    };
  }

  showASuccessMessage() {
    this.showErrorMsg = false;
    this.showLogin = true;
    this.showResetForm = false;
    this.showSuccessMessage = true;
    this.showResendBtn = false;
    this.successMsg = "Your password has been reset successfully";
  }

  showApasswordResetHasBeenSent() {
    this.showErrorMsg = false;
    this.showLogin = false;
    this.showResetForm = false;
    this.showSuccessMessage = true;
    this.showResendBtn = false;
    this.successMsg = "A password email has been sent to the email address provided";
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.checkReset(this.code).subscribe(
        (response: CheckResetPasswordResponseDTO) => {
          if(!response.foundRecord) {
            if(null==response.emailAddress) {
              this.errorMsg = "something went wrong, please click the link below to return to the login page and try again";
              this.showAnErrorMessage();
              this.showLogin = true;
            }
            else {
              this.email = response.emailAddress;
              this.showAnErrorMessage();
              this.errorMsg = "We're sorry, but the password reset link that you clicked has expired, would you like to try again?";
              this.showResendBtn = true;
            }
          } else {
            this.uniqueId = response.uniqueId;
            this.email = response.emailAddress;
            this.showTheResetForm();
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public resendPassword(): void {
    this.subscriptions.push(
      this.authenticationService.resetPassword(this.email).subscribe(
        (response: HttpResponse<any>) => {
          this.showApasswordResetHasBeenSent();
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  onSubmitPasswordChange(form: PasswordResetDTO): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.finalizeReset(this.resetForm).subscribe(newuserinfo => {
          this.showASuccessMessage();
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        })
    );
  }

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  public displayMainPage():void {
    this.router.navigate(['/mainpage']);
  }

  public displayLogin():void {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
