import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settingsDestination',
  templateUrl: './settingsDestination.component.html',
  styleUrls: ['./settingsDestination.component.css']
})
export class SettingsDestinationComponent implements OnInit {

  mqttUrl:string = '';
  topic:string = '';
  clientId:string = '';
  username:string = '';
  password:string = '';
  useTbPayload:boolean = true;
  constructor(private  app: ApplicationService,private router: Router) {

  }

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
    this.getData();
  }

  async submit() {
    try {
      const res = await this.app.updateMqttConfig(this.mqttUrl ,this.topic,this.clientId,this.username,this.password,true);
    }
    catch(e){
      console.log(e);
    }
  }

  async getData() {
    const data = await this.app.getStatus();
    this.mqttUrl = data.mqttBrokerUrl;
    this.topic = data.mqttTopic;
    this.clientId = data.mqttClientId;
    this.username = data.mqttUsername;
    this.password = data.mqttPassword;
    console.log(data);
  }

}
