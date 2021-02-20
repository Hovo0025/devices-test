import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { DevicesGetResponse } from '@core/models/devices.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getDevices(requestData) {
    const url = `${this.apiUrl}device/metering_devices`;

    return this.http.post<DevicesGetResponse>(url, requestData);
  }
}


