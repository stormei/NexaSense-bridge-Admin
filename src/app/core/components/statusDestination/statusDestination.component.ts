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
  previousMsgCounter: number = 0; // Track the previous msgCounter
  bufferSize: number = 0;
  maxBufferSize: number = 1000000;
  state = 'idle';
  publishRate: number = 0; // Messages per second
  bufferTimeRemaining: number = 0; // Seconds the buffer will last
  private intervalId: any;

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
    const data = await this.app.getMqttStatus();

    // Calculate the publishing rate (messages per second)
    const currentMsgCounter = data.msgCounter;
    const messagesPublishedSinceLastCheck = currentMsgCounter - this.previousMsgCounter;

    // Since getData() is called every second, the rate is simply the difference
    this.publishRate = messagesPublishedSinceLastCheck;
    this.previousMsgCounter = currentMsgCounter;

    // Update the MQTT state data
    this.mqttBrokerUrl = data.mqttBrokerUrl;
    this.mqttPublishPaused = data.mqttPublishPaused;
    this.mqttState = data.mqttState;
    this.msgCounter = currentMsgCounter;
    this.bufferSize = data.bufferSize;
    this.state = data.state;

    // Calculate buffer time remaining
    this.calculateBufferTimeRemaining();
  }

  // Method to calculate the percentage of buffer used
  getBufferUsagePercentage(): number {
    return (this.bufferSize / this.maxBufferSize) * 100;
  }

  // Method to calculate how long the buffer will last
  calculateBufferTimeRemaining(): void {
    if (this.publishRate > 0) {
      // Calculate the number of remaining bytes in the buffer
      const remainingBufferSize = this.maxBufferSize - this.bufferSize;

      // Estimate time remaining in seconds (remaining buffer size / messages per second)
      this.bufferTimeRemaining = remainingBufferSize / this.publishRate;
    } else {
      // If no messages are being published, set bufferTimeRemaining to Infinity
      this.bufferTimeRemaining = Infinity;
    }
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}