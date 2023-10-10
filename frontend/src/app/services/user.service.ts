import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:5000/user'

  constructor(private httpClient: HttpClient) { }

signUp(data:any){
    return this.httpClient.post(`${this.url}/signup`, data);
}

login(data: any){
  return this.httpClient.post(`${this.url}/login`, data);
}

placeOrder(orderData:any){
  const header: any ={
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  // const options:any  = {header};
  // console.log(options);
  return this.httpClient.post(`${this.url}/product/order`,orderData, { headers: header });
}


getUserOrder(id:any){
  return this.httpClient.get(`${this.url}/profile/${id}`)
}

}
