import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  url ='http://localhost:5000/bill'

  constructor(private httpClient: HttpClient) { }


  addOrder(data :any){
    return this.httpClient.post(`${this.url}/generateReport`, data)
  
  }
}
