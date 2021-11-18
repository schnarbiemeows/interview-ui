import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../../enum/notification-type.enum";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {

  private id:string;
  public successMsg:string = "";
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private activatedroute: ActivatedRoute) {
    this.activatedroute.params.subscribe(data => {
      this.id = data.code;
      console.log('id = ' + this.id);
    })
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authenticationService.confirmEmail(this.id).subscribe(
        (response: InterviewUserDTO) => {
          this.successMsg = "Thanks for Registering on My Website!";
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotificationMessage(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }
  public displayLogin():void {
    this.router.navigate(['/login']);
  }
  public displayMainPage():void {
    this.router.navigate(['/mainpage']);
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
