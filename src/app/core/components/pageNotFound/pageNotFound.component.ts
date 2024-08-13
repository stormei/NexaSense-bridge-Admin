import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private  app: ApplicationService,private router: Router){ }

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
  }

}
