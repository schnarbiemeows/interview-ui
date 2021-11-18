import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealServiceService {

  constructor() { }

  public test(): string {
    console.log("real service");
    return "REAL";
  }
}
