import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register-email-sent',
  templateUrl: './register-email-sent.component.html',
  styleUrls: ['./register-email-sent.component.css']
})
export class RegisterEmailSentComponent implements OnInit, OnDestroy {

  public email:string;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,private activatedroute: ActivatedRoute) {
    this.activatedroute.params.subscribe(data => {
      this.email = data.email;
      console.log('email = ' + this.email);
    })
  }

  ngOnInit(): void {

  }

  public displayLogin():void {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
