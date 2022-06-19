import {NotificationType} from "../app/enum/notification-type.enum";

export class NotificationServiceStub {

  public notify(type: NotificationType, message: string) {
    console.log("inside NotificationServiceStub.notify method");
  }
}