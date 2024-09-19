import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

interface LightState {
  on: boolean;
  bri: number;
  ct?: number;
  alert: string;
  colormode?: string;
  mode: string;
  reachable: boolean;
}

interface Light {
  state: LightState;
  name: string;
  productname: string;
  [key: string]: any;
}

interface HueStatus {
  [key: string]: Light;
}

@Component({
  selector: 'app-statusHue',
  templateUrl: './statusHue.component.html',
  styleUrls: ['./statusHue.component.css']
})
export class StatusHueComponent implements OnInit, OnDestroy {
  lights: HueStatus | null = null;  // Initialize as null and use the HueStatus type
  private intervalId?: number;

  constructor(private app: ApplicationService, private router: Router) {}

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
      const status: HueStatus = await this.app.getHueStatus();
      console.log(status);
      this.lights = status;  // Directly assign the parsed object with proper type
    } catch (error) {
      console.error('Error fetching Hue status:', error);
    }
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  ctToKelvin(ct: number): number {
    return Math.round(1000000 / ct);
  }

  kelvinToRgb(kelvin: number): { r: number, g: number, b: number } {
    let temp = kelvin / 100;
    let red, green, blue;

    if (temp <= 66) {
      red = 255;
      green = 99.4708025861 * Math.log(temp) - 161.1195681661;
      blue = temp <= 19 ? 0 : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    } else {
      red = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
      green = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
      blue = 255;
    }

    return {
      r: this.clamp(Math.round(red), 0, 255),
      g: this.clamp(Math.round(green), 0, 255),
      b: this.clamp(Math.round(blue), 0, 255)
    };
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  ctToRgb(ct: number | undefined): string | null {
    if (ct === undefined) {
      return null;
    }
    const kelvin = this.ctToKelvin(ct);
    const { r, g, b } = this.kelvinToRgb(kelvin);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
