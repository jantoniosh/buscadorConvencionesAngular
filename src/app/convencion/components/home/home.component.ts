import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init();
  }

  onActivate() {
    window.scroll(0, 0);
    const bodyElement = document.body;
    bodyElement.classList.remove('menuactive');
  }

}
