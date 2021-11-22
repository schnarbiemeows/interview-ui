import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {NotificationType} from "../../enum/notification-type.enum";
import {NotifierService} from "angular-notifier";

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationServiceSpy:jasmine.SpyObj<NotifierService>;
  beforeEach(() => {
    notificationServiceSpy = jasmine.createSpyObj('NotifierService', ['notify']);
    notificationServiceSpy.notify.and.callFake(function(type, message) {
      console.log("calling fake function");
    });
    TestBed.configureTestingModule({
      providers: [NotificationService,
        { provide: NotifierService, useValue: notificationServiceSpy} ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('send a message', () => {
    service.notify(NotificationType.SUCCESS, "WOW");
    expect(service).toBeTruthy();
  });
});
