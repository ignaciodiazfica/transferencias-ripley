import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Prueba Técnica de Ripley';
  ngOnInit() {
    this.primeNgConfig.ripple = true;
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child?.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      )
      .subscribe((title: string) => {
        this.titleService.setTitle(title);
      });
  }
  public constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private primeNgConfig: PrimeNGConfig
  ) {}

}
