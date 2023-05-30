import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  li:any;
  lis: CountryOptions[] = [];
  firstNameChange$!: Observable<InputEvent>;
  lastNameChange$!: Observable<InputEvent>;
  emailChange$!: Observable<InputEvent>;
  phoneChange$!: Observable<InputEvent>;
  countryChange$!: Observable<InputEvent>;
  organizationChange$!: Observable<InputEvent>;
  successfulChange$!: Observable<InputEvent>;
  submit$!: Observable<MouseEvent>;

  constructor(private http: HttpClient, private _router: Router, private notifyService : NotificationService) {}

  ngOnInit(): void {
    this.http.get("https://restcountries.com/v3.1/all")
    .subscribe(Response => {
      // console.log(Response);
      this.li = Response;
      this.lis = this.li.sort((a:any, b:any) => a.name.common.localeCompare(b.name.common)).map((item:any) => {
        return { value: item.cca3, text: item.name.common }
      });
      // console.log(this.lis)
    })

    let btnElement: HTMLButtonElement;
    let firstNameInput: HTMLInputElement;
    let lastNameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let phoneInput: HTMLInputElement;
    let countryInput: HTMLSelectElement;
    let organizationInput: HTMLSelectElement;
    let successfulInput: HTMLSelectElement;

    btnElement = document.getElementById("submit") as HTMLButtonElement;
    firstNameInput = document.getElementById("firstName") as HTMLInputElement;
    lastNameInput = document.getElementById("lastName") as HTMLInputElement;
    emailInput = document.getElementById("email") as HTMLInputElement;
    phoneInput = document.getElementById("phone") as HTMLInputElement;
    countryInput = document.getElementById("country") as HTMLSelectElement;
    organizationInput = document.getElementById("organization") as HTMLSelectElement;
    successfulInput = document.getElementById("successful") as HTMLSelectElement;

    this.firstNameChange$ = fromEvent<InputEvent>(firstNameInput, "input");
    this.lastNameChange$ = fromEvent<InputEvent>(lastNameInput, "input");
    this.emailChange$ = fromEvent<InputEvent>(emailInput, "input");
    this.phoneChange$ = fromEvent<InputEvent>(phoneInput, "input");
    this.countryChange$ = fromEvent<InputEvent>(countryInput, "input");
    this.organizationChange$ = fromEvent<InputEvent>(organizationInput, "input");
    this.successfulChange$ = fromEvent<InputEvent>(successfulInput, "input");
    this.submit$ = fromEvent<MouseEvent>(btnElement, "click");

    this.firstNameChange$.pipe(getValueFromInputEvent).subscribe(firstName => {
      userModel.firstName = firstName;
    });

    this.lastNameChange$.pipe(getValueFromInputEvent).subscribe(lastName => {
      userModel.lastName = lastName;
    });

    this.emailChange$.pipe(getValueFromInputEvent).subscribe(email => {
      userModel.email = email;
    });

    this.phoneChange$
      .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
      .subscribe(phone => {
        userModel.phone = phone;
      });
    
    this.countryChange$.pipe(getValueFromInputEvent).subscribe(country => {
      userModel.country = country;
    });

    this.organizationChange$.pipe(getValueFromInputEvent).subscribe(organization => {
      userModel.organization = organization;
    });

    this.successfulChange$.pipe(getValueFromInputEvent).subscribe(successful => {
      userModel.successful = successful;
    });

    this.submit$
      .pipe(tap((event: MouseEvent) => {return event.preventDefault(),console.log(event)}))
      .subscribe(() => {
        console.log("Sending User", { userModel });
        const target = event?.target as HTMLButtonElement
        target.disabled = true

        if (userModel.successful === "true") {
          this.notifyService.showSuccess("Success", "Form submitted successfully")
          setTimeout(() => {
            this._router.navigateByUrl("success")
          }, 5000)
        } else if (userModel.successful === "false") {
          this.notifyService.showError("Error", "Form submission failed!")
          setTimeout(() => {
            console.log("nav")
            // this._router.navigateByUrl("");
            window.location.reload()
          }, 5000) 
        }
      });

    function getValueFromInputEvent(
      event: Observable<InputEvent>
    ): Observable<string> {
      return event.pipe(
        // tap(event => console.log("event.target", event.target)),
        map((event: InputEvent) => (event.target as HTMLInputElement).value)
      );
    }
  }

  log(x:any) { console.log(x); }
}
