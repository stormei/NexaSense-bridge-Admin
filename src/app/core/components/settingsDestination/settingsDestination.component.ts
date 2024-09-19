import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settingsDestination',
  templateUrl: './settingsDestination.component.html',
  styleUrls: ['./settingsDestination.component.css']
})
export class SettingsDestinationComponent implements OnInit {

  mqttUrl: string = '';
  topic: string = '';
  clientId: string = '';
  username: string = '';
  password: string = '';
  useTbPayload: boolean = true;
  isModalOpen: boolean = false;  // Flag to control modal visibility
  isAlertVisible: boolean = false; // Flag to control alert visibility

  constructor(private app: ApplicationService, private router: Router) {}

  ngOnInit() {
    if(!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
    this.getData();
  }

  async submit() {
    // Show the modal instead of directly submitting
    this.isModalOpen = true;
  }

   confirmSubmit() {
    try {
      this.app.updateMqttConfig(this.mqttUrl, this.topic, this.clientId, this.username, this.password, this.useTbPayload);
      this.isModalOpen = false;  // Close the modal after submission
      this.isAlertVisible = true; // Show the success alert
      setTimeout(() => this.isAlertVisible = false, 3000); // Hide alert after 5 seconds
    }
    catch(e){
      console.log(e);
    }
  }

  cancelSubmit() {
    this.isModalOpen = false;  // Close the modal if cancel is clicked
  }

  async getData() {
    const data = await this.app.getMqttConfig();
    this.mqttUrl = data.mqttBrokerUrl;
    this.topic = data.mqttTopic;
    this.clientId = data.mqttClientId;
    this.username = data.mqttUsername;
    this.password = data.mqttPassword;
  }
}
