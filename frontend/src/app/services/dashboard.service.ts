import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService  {
  url = 'http://localhost:5000/dashBoard'

  constructor(private httpClient: HttpClient) { }

  getDetails(){
    return this.httpClient.get(`${this.url}/getDetails`);
  }
}
