import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
    url = 'http://localhost:5000/product'

  constructor(private httpClient: HttpClient) { }

getProducts(){
    return this.httpClient.get(`${this.url}/get`);
}

getProductPage(offset:number, limit:number){
  return this.httpClient.get(`${this.url}/get?offset=${offset}&limit=${limit}`);
}

getTotalProducts(){
  return this.httpClient.get(`${this.url}/count`)
}

addProduct(data: any){
  console.log('Api not calling');
  return this.httpClient.post(`${this.url}/add`, data)
}

deleteProduct(id: any){
  return this.httpClient.delete(`${this.url}/delete/${id}`)
}

getProductById(id:any){
  return this.httpClient.get(`${this.url}/getById/${id}`)
}

updateProduct(data: any, productId: string){
  console.log(data);
  return this.httpClient.put(`${this.url}/update/${productId}`, data)
}

getProductByCategory(id:any){
  return this.httpClient.get(`${this.url}/getByCategory/${id}`)
}
}
