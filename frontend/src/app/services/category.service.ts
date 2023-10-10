import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    url = 'http://localhost:5000/category'

  constructor(private httpClient: HttpClient) { }

//   signup(data: any){
//     return this.httpClient.post(this.url + "/user/signup", data, {
//       headers : new HttpHeaders().set('Content-Type', "application/json")
//     })
   
//   }
getCategories(){
    return this.httpClient.get(`${this.url}/get`);
}

addCategory(data :any){
  return this.httpClient.post(`${this.url}/add`, data)
}

deleteCategory(id: any){
  return this.httpClient.delete(`${this.url}/delete/${id}`)
}

}
