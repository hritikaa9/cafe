import { Component, OnInit } from '@angular/core';
import { UserproductService } from '../services/userproduct.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: {
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }[] = [];

  orderData: any; 
  token: any;  
  
  constructor(private userProduct: UserproductService, private userService: UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
   
    this.cartItems = this.userProduct.getCartItems();
  }

  removeCartItem(productId: number) {
    const index = this.cartItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.userProduct.removeItemByProductId(productId);
    }
  }

  placeOrder(orderData:any){
    this.orderData = this.cartItems;
    console.log(orderData)
    this.userService.placeOrder(orderData).subscribe(
      (response)=>{
      console.log('Order placed successfully')
      // alert('rrrr')
      this.toastr.success('Order placed successfully');
      this.userProduct.removeAllItems()
      this.router.navigate(['/profile']);
   
      },
      (error)=>{
        console.log('Error placing the order')
      }
    )
  }


}

