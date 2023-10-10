import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId:any
  userName: any;
  userEmail: any;
  role: any;
  // orders: any[] = [];
  orders: any;

  constructor(private userService: UserService) { }


  getProfileData(){
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      console.log(decoded.id)
      this.userId = decoded.id
      this.userName = decoded.name;
      this.userEmail = decoded.email;
      this.role= decoded.role;
      this.getUserOrder(this.userId);
    }
  }
  ngOnInit(): void {
    this.getProfileData()
   
  }


  getUserOrder(userId: any) {
    this.userService.getUserOrder(userId).subscribe(
      (response: any) => {
        console.log(response);
        this.orders = [...response];
        console.log(this.orders[0].products[0].productName);
        
      },
      (error) => {
        console.error('Error loading user orders');
      }
    );
  }


calculateTotal(products: any[]): number {
  let total = 0;
  for (const product of products) {
    total += parseFloat(product.productPrice);
  }
  return total;
}

}
