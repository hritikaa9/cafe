import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserproductService {

  url ="http://localhost:5000/user/product/order"
  private cart: {
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }[] = [];
  private productQuantities: { [productId: number]: number } = {};
  constructor(private http: HttpClient) { }

    // addProduct(productId: number) {
    //   if (this.productQuantities[productId]) {
    //     this.productQuantities[productId]++;
    //   } else {
    //     this.productQuantities[productId] = 1;
    //   }
    // }

    // removeProduct(productId: number) {
    //   if (this.productQuantities[productId]) {
    //     this.productQuantities[productId]--;
    //     if (this.productQuantities[productId] === 0) {
    //       delete this.productQuantities[productId];
    //     }
    //   }
    // }

    addProduct(productId: number, productName: string, productPrice: number) {
      const existingItem = this.cart.find(item => item.productId === productId);
    
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          productId,
          productName,
          productPrice,
          quantity: 1
        });
      }
    }
    
    removeProduct(productId: number) {
      const index = this.cart.findIndex(item => item.productId === productId);
    
      if (index !== -1) {
        const item = this.cart[index];
        item.quantity--;
    
        if (item.quantity === 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    getProductQuantityInCart(productId: number): number {
      const item = this.cart.find(cartItem => cartItem.productId === productId);
      return item ? item.quantity : 0;
    }


    getCartItems(): {
      productId: number;
      productName: string;
      productPrice: number;
      quantity: number;
    }[] {
      return [...this.cart];
    }

    removeItemByProductId(productId: number) {
      const index = this.cart.findIndex((item) => item.productId === productId);
  
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    }

    removeAllItems() {
      this.cart = [];
    }
}
