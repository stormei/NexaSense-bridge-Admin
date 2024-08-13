import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statusSystem',
  templateUrl: './statusSystem.component.html',
  styleUrls: ['./statusSystem.component.css']
})
export class StatusSystemComponent implements OnInit {

  gatewayName: string = '';
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
    this.gatewayName = data.gatewayName;
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
