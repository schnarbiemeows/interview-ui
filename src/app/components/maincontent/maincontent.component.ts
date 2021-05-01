import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {NotificationType} from "../../enum/notification-type.enum";
import {NotificationService} from "../../services/notification/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit() {

  }



  private sendErrorNotification(notificationType: NotificationType, message: string): void {
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
