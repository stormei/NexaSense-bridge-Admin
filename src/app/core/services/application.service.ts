import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

baseURL:string = 'http://localhost:9091';
token :string = '';
username :string = '';
password:string = '';
sessionId:any = '';
authenticated:boolean = false;
tokenExpiryTime:number = 0;
tokenCheckInterval:any = 0;
private tokenExpiredSubject = new BehaviorSubject<boolean>(false);
tokenExpired$ = this.tokenExpiredSubject.asObservable(); // Observable to emit token expiration events


constructor() { }


/*****************************************************************
 * Login to NexaSense Bridge
 * @param {username,password}
 * @return {token} token and refreshToken
 ******************************************************************/
async authenticate(username: string, password: string): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json, text/plain, */*',
    Connection: 'keep-alive',
  };

  const body = {
    username,
    password,
  };

  const bodystr = JSON.stringify(body);

  try {
    const response = await fetch(`${this.baseURL}/api/login`, {
      headers,
      body: bodystr,
      method: 'POST',
    });

    if (!response.ok) {
      console.error('Authentication failed with status:', response.status);
      this.authenticated = false;
      return false;
    }

    const userToken = await response.json();

    if (!userToken || !userToken.token) {
      console.error('Invalid token received:', userToken);
      this.authenticated = false;
      return false;
    }

    this.token = userToken.token;
    console.log('Received token:', this.token);

    // Decode token to extract expiration time
    const tokenPayload = this.decodeJwt(this.token);
    if (!tokenPayload || !tokenPayload.exp) {
      console.error('Invalid token payload:', tokenPayload);
      this.authenticated = false;
      return false;
    }

    // Convert expiration time to milliseconds
    this.tokenExpiryTime = tokenPayload.exp * 1000;

    // Set authenticated to true
    this.authenticated = true;

    // Start token expiry check
    this.startTokenExpiryCheck();

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    this.authenticated = false;
    return false;
  }
}

/**
 * Decode JWT token
 * @param token JWT token string
 * @return Decoded token payload
 */
private decodeJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * Start periodic check for token expiration
 */
private startTokenExpiryCheck(): void {
  // Clear any existing interval
  if (this.tokenCheckInterval) {
    clearInterval(this.tokenCheckInterval);
  }

  this.tokenCheckInterval = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime >= this.tokenExpiryTime) {
      console.warn('Token has expired');
      this.authenticated = false;
      clearInterval(this.tokenCheckInterval);
      this.tokenExpiredSubject.next(true); // Emit token expiration event
    } else {
      console.log('Token is still valid');
    }
  }, 10000); // Check every 10 seconds
}

/**
 * Cleanup method to be called on logout or component destroy
 */
public cleanup(): void {
  if (this.tokenCheckInterval) {
    clearInterval(this.tokenCheckInterval);
  }
  this.authenticated = false;
  this.token = '';
  this.tokenExpiryTime = 0;
  this.tokenExpiredSubject.next(false); // Reset the token expired state
}


/*****************************************************************
 * get NexaSense-Bridge status
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getStatus(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/rest_status`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getStatus:', error);
    return 0;
  }
}

/*****************************************************************
 * get NexaSense-Bridge OPCUA data
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getOpcData(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/opc/tagdata`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getOpcData:', error);
    return 0;
  }
}

/*****************************************************************
 * get NexaSense-Bridge OPCUA Server tree
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getOpcTree(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/opc/tree`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getOpcData:', error);
    return 0;
  }
}

/*****************************************************************
 * get NexaSense-Bridge OPC UA status
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getOpcStatus(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/opc/status`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getMqttConfig:', error);
    return 0;
  }
}

/*****************************************************************
 * get NexaSense-Bridge Philips Hue status
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getHueStatus(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/hue/status`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getHueStatus:', error);
    return 0;
  }
}

/*****************************************************************
 * get NexaSense-Bridge OPCUA Config
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getOpcConfig(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/opc/config`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getOpcConfig:', error);
    return 0;
  }
}

async postTagsToServer(tagsArray: any[]): Promise<void> {
  const url = `${this.baseURL}/api/opc/tags`;

  try {
    // Ensure the input is an array
    if (!Array.isArray(tagsArray)) {
      throw new Error('tagsArray should be an array');
    }

    // Create an object with a 'tagIds' property containing the array
    const data = {
      tagIds: tagsArray,
    };

    // Make a POST request to the server
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',  // Include Content-Type header
        'x-authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
    }
   
  } catch (error) {
    console.error('Error sending data to the server:', error);
  }
}

async publishSharedAttributes(payload: Record<string, any>): Promise<boolean> {
  const url = `${this.baseURL}/api/mqtt/shared_attributes`;

  try {
    console.log('Publishing shared attributes:', payload);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',  // Include Content-Type header
        'x-authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is okay
    if (response.ok) {
      console.log('Successfully published shared attributes.');
      return true;  // Indicate success
    } else {
      const errorMessage = await response.text();
      console.error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      return false;  // Indicate failure
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending data to the server:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return false;  // Indicate failure in case of an exception
  }
}


/*****************************************************************
 * get tags from TB
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async pullDeviceAttributes(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/mqtt/device_attributes`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getMqttConfig:', error);
    return 0;
  }
}


/**************************************************************************
 * Update NexaSense-Bridge OPC UA Config
 * 
 * @param {string} opcUaUrl - The OPCUA URL
 * @param {string} opcUsername - The opcua username
 * @param {string} opcPassword - The opcua password
 * @param {boolean} enableOPCUA - enable OPC UA connnector
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 **************************************************************************/
async updateOpcConfig(
  opcUaUrl: string,
  opcUsername: string,
  opcPassword: string,
  enableOPCUA : boolean
): Promise<any> {
  try {
    const body = JSON.stringify({
      opcUaUrl,
      opcUsername,
      opcPassword,
      enableOPCUA
    });
  
    const response = await fetch(`${this.baseURL}/api/opc/config`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'POST',
      mode: 'cors',
      body: body,
    });

    // Check if the response is not successful
    if (!response.ok) {
      // Handle 400 validation error specifically
      if (response.status === 400) {
        const errorData = await response.json(); // Parse the response for validation errors
        console.error('Validation failed:', errorData);
        return { status: 'validation_error', errors: errorData.errors };
      }

      // For other errors, throw an error
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return response data if successful
    return await response.json();
  } catch (error: unknown) {
    // Safely check if the error is an instance of Error
    if (error instanceof Error) {
      console.error('Error in updateOPCUAConfig:', error);
      return { status: 'error', error: error.message };
    } else {
      console.error('Unknown error in updateOPCUAConfig:', error);
      return { status: 'error', error: 'An unknown error occurred' };
    }
  }
}


/*****************************************************************
 * get NexaSense-Bridge MQTT config 
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getMqttConfig(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/mqtt/config`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getMqttConfig:', error);
    return 0;
  }
}


/*****************************************************************
 * get NexaSense-Bridge MQTT status
 * 
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 ******************************************************************/
async getMqttStatus(): Promise<any> {
  try {
    const response = await fetch(`${this.baseURL}/api/mqtt/status`, {
      headers: {
        'Accept': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getMqttConfig:', error);
    return 0;
  }
}


/**************************************************************************
 * Update NexaSense-Bridge MQTT Config
 * 
 * @param {string} mqttUrl - The MQTT URL
 * @param {string} topic - The MQTT topic
 * @param {string} clientId - The client ID
 * @param {string} username - The MQTT username
 * @param {string} password - The MQTT password
 * @param {boolean} useTbPayload - Whether to use ThingsBoard payload format
 * @return {Promise<any>} status as JSON object or 0 in case of an error
 **************************************************************************/
async updateMqttConfig(
  mqttUrl: string,
  topic: string,
  clientId: string,
  username: string,
  password: string,
  useTbPayload: boolean = true
): Promise<any> {
  try {
    const body = JSON.stringify({
      mqttUrl,
      topic,
      clientId,
      username,
      password,
      useTbPayload,
    });

    const response = await fetch(`${this.baseURL}/api/mqtt/config`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-authorization': `Bearer ${this.token}`,
      },
      method: 'POST',
      mode: 'cors',
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateMqttConfig:', error);
    return 0;
  }
}

  logout() {
    this.authenticated = false;
    this.sessionId = null;
    this.token = '';
    this.username = '';
    this.password = '';
    this.cleanup();
  }

}
