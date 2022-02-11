import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  logoSrc: string = "";
  logoAlt: string = "";
  constructor() { }

  ngOnInit(): void {
    this.logoSrc = "assets/images/logo.png";
    this.logoAlt = 'logo';
  }

}
