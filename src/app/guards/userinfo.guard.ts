import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import {AuthenticationService} from "../services/authentication/authentication.service";

@Injectable({providedIn: 'root'})
export class UserinfoGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private notificationService: NotificationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log("inside the user guard")
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      //console.log("user is logged in")
      return true;
    }
    this.router.navigate(['/mainpage']);
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    return false;
  }
}
