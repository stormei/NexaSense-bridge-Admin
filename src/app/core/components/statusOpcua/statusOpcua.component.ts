import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-opcua', // Changed selector to follow Angular style guide (kebab-case)
  templateUrl: './statusOpcua.component.html',
  styleUrls: ['./statusOpcua.component.css']
})
export class StatusOpcuaComponent implements OnInit, OnDestroy {
  connectorEnabled: boolean = true;
  opcUaUrl: string = '';
  tags: string[] = [];
  tagsArray: any[] = [];  // Explicitly typing the array as 'any[]' or the appropriate type if known
  private intervalId?: number;  // Optional type for better TypeScript support

  constructor(private app: ApplicationService, private router: Router) { }

  ngOnInit() {
    if (!this.app.authenticated) {
      this.router.navigate(['/login']);
      return;  // Add return to avoid further execution if not authenticated
    }

    this.getData();

    // Set up an interval to call getData every 1 second
    this.intervalId = window.setInterval(() => {
      this.getData();
    }, 1000);
  }

  async getData() {
    try {
      const data = await this.app.getStatus();
      this.tagsArray = await this.app.getOpcData();

      console.log(this.tagsArray);
      console.log(data);
      this.connectorEnabled = data.enableOPCUA;
      this.opcUaUrl = data.opcUaUrl || '';  // Safe access in case data.opcUaUrl is undefined
      this.tags = data.tags || [];  // Safe access in case data.tags is undefined
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  activeTags():number { 
    return this.tagsArray.length;
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
}
