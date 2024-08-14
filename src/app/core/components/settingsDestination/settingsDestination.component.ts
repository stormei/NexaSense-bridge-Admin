import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settingsDestination',
  templateUrl: './settingsDestination.component.html',
  styleUrls: ['./settingsDestination.component.css']
})
export class SettingsDestinationComponent implements OnInit {
  model:string = '';
  constructor(private  app: ApplicationService,private router: Router) {

  }

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
  }

  submit() {
  }

}
