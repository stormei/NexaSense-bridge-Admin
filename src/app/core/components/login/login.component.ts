import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string='';
  password: string='';
  rememberMe: boolean=false;
  type: string='';
  erroMessage:string='Login failed';
  failed: boolean=false;
  constructor(private  app: ApplicationService,private router: Router) {

  }

  ngOnInit() {
    this.erroMessage = '';
    this.failed = false;
    this.logout();
  }

  async authenticate(username: string, password: string) {
    const res  = await this.app.authenticate(username, password);
    if (!res) {
      this.failed = true;
      this.erroMessage = 'Wrong username or password';
     }
     else {
      this.router.navigate(['/home', {}]);
     }
  }

  failedLogin():boolean {
    return this.failed;
  }

  logout():void {
    this.app.logout();
  }

}
