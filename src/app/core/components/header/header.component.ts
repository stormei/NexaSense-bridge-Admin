import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  modalOpen: boolean = false;
  isDarkTheme: boolean = false;
  tokenExpired: boolean = false;
  private subscription: Subscription = new Subscription;

  constructor(private app: ApplicationService, private router: Router) {}

  ngOnInit() {
    // Subscribe to token expiration events
    this.subscription = this.app.tokenExpired$.subscribe(expired => {
      if (expired) {
        this.tokenExpired = true;
        this.modalOpen = true; // Open modal when token expires
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up subscription
    }
  }

  authenticated(): boolean {
    return this.app.authenticated;
  }

  logout() {
    this.modalOpen = false;
    this.app.logout();
    this.router.navigate(['/login', {}]);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';
    document.body.setAttribute('cds-theme', theme);
  }

  get iconClass(): string {
    return this.isDarkTheme ? 'fa-sun' : 'fa-moon';
  }
}
