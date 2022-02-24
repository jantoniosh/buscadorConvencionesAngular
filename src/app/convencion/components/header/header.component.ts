import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    private logoSrc: string;

    constructor() {
        this.logoSrc = "assets/images/logo.png";
    }

    getLogo (): string {
        return this.logoSrc
    }
}
