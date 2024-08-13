import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statusDestination',
  templateUrl: './statusDestination.component.html',
  styleUrls: ['./statusDestination.component.css']
})

export class StatusDestinationComponent implements OnInit, OnDestroy {
  mqttBrokerUrl: string = 'mqtt://';
  mqttPublishPaused: string = 'false';
  mqttState: string = '';
  msgCounter: number = 0;
  private intervalId: any;  // To store the interval ID

  constructor(private app: ApplicationService, private router: Router) { }

  ngOnInit() {
    if (!this.app.authenticated) {
      this.router.navigate(['/login', {}]);
    }
    this.getData();
    
    // Set up an interval to call getData every 1 second
    this.intervalId = setInterval(() => {
      this.getData();
    }, 1000);
  }

  async getData() {
    const data = await this.app.getStatus();
    this.mqttBrokerUrl = data.mqttBrokerUrl;
    this.mqttPublishPaused = data.mqttPublishPaused;
    this.mqttState = data.mqttState;
    this.msgCounter = data.msgCounter;
    console.log(data);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

