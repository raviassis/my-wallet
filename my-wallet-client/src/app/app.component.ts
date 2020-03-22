import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-wallet-client';
  loading;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
        switch (true) {
            case e instanceof NavigationStart: {
                this.loading = true;
                break;
            }

            case e instanceof NavigationEnd:
            case e instanceof NavigationCancel:
            case e instanceof NavigationError: {
                this.loading = false;
                break;
            }
            default: {
                break;
            }
        }
    });
  }
}
