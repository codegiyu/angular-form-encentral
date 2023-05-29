import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CountryOptions {
  value: string;
  text: string;
}

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
