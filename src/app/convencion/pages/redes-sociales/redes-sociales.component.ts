import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-redes-sociales',
    templateUrl: './redes-sociales.component.html'
})
export class RedesSocialesComponent implements OnInit {

    ruta: string = "";
    private url: string = environment.urlContenido;
    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin 

    constructor(private activatedRoute: ActivatedRoute, private router:Router) { }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(map(() => window.history.state))
            .subscribe(data => {
                console.log('data', data.state.ruta);
                this.ruta = `${this.url}/${data.state.ruta}`;
                if (this.ruta === null) {
                    this.router.navigate(['/']);
                }
            });
    }

}
