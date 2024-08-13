import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { ClarityModule } from "@clr/angular";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private  app: ApplicationService,private router: Router) { }

  ngOnInit() {
  }
  authenticated():boolean {
    return this.app.authenticated;
  }

}
