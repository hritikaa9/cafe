import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {

  url = 'http://localhost:5000/bill'

  constructor(private http: HttpClient) {}

  // getDetails() {
  //   return this.http.get((`${this.url}/getProducts`));
  // }

  addDetail(data: any){
    return this.http.post(`${this.url}/addProducts`, data);
  }
}

//getProducts