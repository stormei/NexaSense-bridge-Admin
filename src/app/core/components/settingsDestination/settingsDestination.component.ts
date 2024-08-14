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
  mqttUrl:string = '';
  topic:string = '';
  clientId:string = '';
  username:string = '';
  password:string = '';
  useTbPayload:boolean = false;
  constructor(private  app: ApplicationService,private router: Router) {

  }

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
    this.getData();
  }

  submit() {
  }

  async getData() {
    const data = await this.app.getStatus();
    this.mqttUrl = data.mqttBrokerUrl;
    this.topic = data.mqttPublishPaused;
    this.clientId = data.mqttState;
    this.username = data.msgCounter;
    this.password = data.msgCounter;
    console.log(data);
  }

}
