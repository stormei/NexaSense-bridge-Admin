import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalOpen:boolean = false;
  isDarkTheme:boolean = false;
  constructor(private  app: ApplicationService,private router: Router) { }

  ngOnInit() {
  }
  authenticated():boolean {
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
