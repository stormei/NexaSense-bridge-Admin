import { Injectable } from '@angular/core';

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

constructor() { }

   /*****************************************************************
   * Login to NexaSense Bridge
   * @param {username,password}
   * @return {token} token and refreshToken
   ******************************************************************/
   async authenticate(username: string, password: string): Promise<any>{
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json, text/plain, */*',
      Connection: 'keep-alive'
    };

    const body = {
      username ,
      password
    };
    const bodystr = JSON.stringify(body);
    let response: any;

    try {
      response = await fetch(`${this.baseURL}/api/login`, {
        headers,
        body: bodystr,
        method: 'POST'
      });
      try {
        const userToken = await response.json();
        this.token = userToken.token;

        console.log('Here goes token' + this.token);
        const tmp = JSON.stringify(userToken);
        
        this.authenticated = true;

        return true;
      }
      catch(error) {
        console.log(error);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
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
    const response = await fetch(`${this.baseURL}/api/rest_opcgettagdata`, {
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

    const response = await fetch(`${this.baseURL}/api/updateMQTTConfig`, {
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
  }

}
