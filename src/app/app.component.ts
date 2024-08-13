import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from './core/services/application.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bridgeAdmin';
  isDarkTheme = false;
  constructor(private  app: ApplicationService,private router: Router) { }

  ngOnInit() {
  }

  authenticated():boolean {
     return this.app.authenticated;
  }

}
