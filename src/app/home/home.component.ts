import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface CountryOptions {
  value: string;
  text: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  organization: string;
  successful: string;
}

let userModel: User = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  organization: "",
  successful: ""
}

let btnElement: HTMLButtonElement;
let firstNameInput: HTMLInputElement;
let lastNameInput: HTMLInputElement;
let emailInput: HTMLInputElement;
let phoneInput: HTMLInputElement;
let countryInput: HTMLSelectElement;
let organizationInput: HTMLSelectElement;
let successfulInput: HTMLSelectElement;

let firstNameChange$: Observable<InputEvent>;
let lastNameChange$: Observable<InputEvent>;
let emailChange$: Observable<InputEvent>;
let phoneChange$: Observable<InputEvent>;
let countryChange$: Observable<InputEvent>;
let organizationChange$: Observable<InputEvent>;
let successfulChange$: Observable<InputEvent>;
let submit$: Observable<MouseEvent>;

btnElement = document.getElementById("submit") as HTMLButtonElement;
firstNameInput = document.getElementById("firstName") as HTMLInputElement;
lastNameInput = document.getElementById("lastName") as HTMLInputElement;
emailInput = document.getElementById("email") as HTMLInputElement;
phoneInput = document.getElementById("phone") as HTMLInputElement;
countryInput = document.getElementById("country") as HTMLSelectElement;
organizationInput = document.getElementById("organization") as HTMLSelectElement;
successfulInput = document.getElementById("successful") as HTMLSelectElement;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  li:any;
  lis: CountryOptions[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://restcountries.com/v3.1/all")
    .subscribe(Response => {
      console.log(Response);
      this.li = Response;
      this.lis = this.li.sort((a:any, b:any) => a.name.common.localeCompare(b.name.common)).map((item:any) => {
        return { value: item.cca3, text: item.name.common }
      });
      console.log(this.lis)
    })
  }

  log(x:any) { console.log(x); }
}
