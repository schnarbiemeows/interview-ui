import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import {HeaderNavComponent} from "./header-nav/header-nav.component";
import {SearchComponent} from "./search/search.component";
import {NotificationService} from "../services/notification/notification.service";
import { AddButtonComponent } from './add-button/add-button/add-button.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [HeaderNavComponent, SearchComponent, AddButtonComponent],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule
    ],
    exports: [HeaderNavComponent, SearchComponent, AddButtonComponent],
  providers: [NotificationService]
})
export class SharedModule { }
