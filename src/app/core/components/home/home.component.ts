import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private  app: ApplicationService,private router: Router) {

   }

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
  }
  

}
