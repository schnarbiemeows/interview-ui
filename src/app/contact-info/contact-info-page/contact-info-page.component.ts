import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationType} from "../../enum/notification-type.enum";
import {InterviewUserDTOWrapper} from "../../models/InterviewUserDTOWrapper";
import {HttpErrorResponse} from "@angular/common/http";
import {InterviewUserApiService} from "../../api/interview-user-api/interview-user-api.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-contact-info-page',
  templateUrl: './contact-info-page.component.html',
  styleUrls: ['./contact-info-page.component.css']
})
export class ContactInfoPageComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  public changePasswordForm: ChangePasswordForm;
  public changeUserInfoForm: ChangeUserInfoForm;
  loaded: boolean = false;
  interviewuser: InterviewUserDTO;
  interviewuserwrapper: InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
  showUserInfo: boolean = true;
  showChangeInfo: boolean = false;
  showChangePwd: boolean = false;
  cancelMsg: string = "Cancel";
  saveChangesMsg: string = "Save Changes";
  constructor(private router: Router, private authenticationService: AuthenticationService,
              private interviewUserService: InterviewUserApiService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.reload()
  }

  reload() {
    this.loaded = false;
    this.interviewuser = this.authenticationService.getUserFromLocalCache();
    this.interviewuserwrapper.fromDto(this.interviewuser);
    this.showChangePwd = false;
    this.showChangeInfo = false;
    this.showUserInfo = true;
    this.loaded = true;
  }

  public changePassword() {
    this.showUserInfo = false;
    this.showChangePwd = true;
    this.showChangeInfo = false;
    this.changePasswordForm = {
      oldPassword: null,
      newPassword: null,
      newPasswordConfirm: null
    };
  }

  public changeInfo() {
    this.showUserInfo = false;
    this.showChangePwd = false;
    this.showChangeInfo = true;
    this.changeUserInfoForm = {
      newEmailAddr: this.interviewuserwrapper.emailAddr,
      newFirstName: this.interviewuserwrapper.firstName,
      newLastName: this.interviewuserwrapper.lastName,
      newUserName: this.interviewuserwrapper.userName
    }
  }
  /*public displayMainPage():void {
    this.router.navigate(['mainpage']);
  }*/

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  onSubmitInfoChange(): void {
    this.showLoading = true;
    this.interviewuserwrapper.newUserName = this.changeUserInfoForm.newUserName;
    this.interviewuserwrapper.newEmailAddr = this.changeUserInfoForm.newEmailAddr;
    this.interviewuserwrapper.newFirstName = this.changeUserInfoForm.newFirstName;
    this.interviewuserwrapper.newLastName = this.changeUserInfoForm.newLastName;
    this.subscriptions.push(
      this.interviewUserService.updateUserByUser(this.interviewuserwrapper).subscribe(newuserinfo => {
        this.authenticationService.addUserToLocalCache(newuserinfo);
        this.sendNotificationMessage(NotificationType.SUCCESS, "information updated.");
        this.showLoading = false;
        this.reload();
      })
    );

  }

  onSubmitPasswordChange(): void {
    this.showLoading = true;
    this.interviewuserwrapper.newPassword = this.changePasswordForm.newPassword;
    this.interviewuserwrapper.password = this.changePasswordForm.oldPassword;
    this.subscriptions.push(
      this.interviewUserService.updateUserByUser(this.interviewuserwrapper).subscribe(newuserinfo => {
          this.authenticationService.addUserToLocalCache(newuserinfo);
          this.sendNotificationMessage(NotificationType.SUCCESS, "information updated.");
          this.showLoading = false;
          this.reload();
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ChangeUserInfoForm {
  newEmailAddr?: string;
  newFirstName?: string;
  newLastName?: string;
  newUserName?: string;
}
