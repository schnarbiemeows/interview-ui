import { Component, OnInit } from '@angular/core';
import {RealServiceService} from "../services/real-service.service";

@Component({
  selector: 'app-test-mock',
  templateUrl: './test-mock.component.html',
  styleUrls: ['./test-mock.component.css']
})
export class TestMockComponent implements OnInit {

  public message:string = '';
  constructor(private service: RealServiceService) { }

  ngOnInit(): void {
    this.message = this.service.test();
    console.log(this.message);
  }

  public test(): void {
    console.log("testing again");
    this.message = this.service.test();
    console.log(this.message);
  }
}
