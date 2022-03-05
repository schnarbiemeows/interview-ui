import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import {HeaderNavComponent} from "./header-nav/header-nav.component";
import {SearchComponent} from "./search/search.component";
import {NotificationService} from "../services/notification/notification.service";
import {FormsModule} from "@angular/forms";
import { MessageBoardComponent } from '../main-page/message-board/message-board.component';


@NgModule({
  declarations: [HeaderNavComponent, SearchComponent, MessageBoardComponent],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule
    ],
    exports: [HeaderNavComponent, SearchComponent, MessageBoardComponent],
  providers: [NotificationService]
})
export class SharedModule { }
