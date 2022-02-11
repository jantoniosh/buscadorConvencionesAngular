import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    logoSrc: string = "assets/images/logo.png";
    logoAlt: string = 'logo';
    constructor() { }

    ngOnInit(): void { }
}
