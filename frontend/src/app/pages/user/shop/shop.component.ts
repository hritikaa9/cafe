import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../../services/category.service';
import { UserproductService } from '../../../services/userproduct.service';




@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

 
  category: any;
  productsByCategory: { [key: number]: any[] } = {};
  constructor(private productDetail: ProductService, private categoryDetail: CategoryService, private userProduct:UserproductService){}

  loadCategory(){
    this.categoryDetail.getCategories().subscribe((data) =>{
      this.category = data;
      // console.log(data)

      for (const cat of this.category) {
        this.loadProductByCategory(cat.id);
      }
     })
  }

  loadProductByCategory(id:any){
    this.productDetail.getProductByCategory(id).subscribe((data:any)=>{
      this.productsByCategory[id] = data;
      console.log(this.productsByCategory)
    })
  }

  addProductToCart(productId: number, productName: string, productPrice: number) {
    this.userProduct.addProduct(productId, productName, productPrice);
  }

 
  removeProductFromCart(productId: number) {
    this.userProduct.removeProduct(productId);
  }

  getProductQuantityInCart(productId: number): number {
    return this.userProduct.getProductQuantityInCart(productId);
  }

 


  ngOnInit(): void {
    this.loadCategory()
  }
}
