import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statusMtconnect',
  templateUrl: './statusMtconnect.component.html',
  styleUrls: ['./statusMtconnect.component.css']
})
export class StatusMtconnectComponent implements OnInit {
  private intervalId: any;  // To store the interval ID
  connectorEnabled: boolean = true;
  mtcBrokerUrl: string = '';
  treeData: any[] = []; 
  activeLeafs: any[] = [];
  lasSequence: number = 0;
  lastKey: string = '';
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

    //only update if sequence is changed
    if(data.mtcCurrentSecuence !== this.lasSequence) {
      this.treeData = data.mtcData;
      this.activeLeafs = data.mtcLastkeys;
    }
    
    this.lasSequence = data.mtcCurrentSecuence;
    this.mtcBrokerUrl = data.mtcBrokerUrl;
    this.connectorEnabled = data.enableMTCONNECT;
    console.log(data);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
