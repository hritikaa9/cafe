import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import{CategoryService} from '../../../services/category.service';
import{ProductdetailsService} from '../../../services/productdetails.service';
import { BillsService } from 'src/app/services/bills.service';
import { ToastrService } from 'ngx-toastr';

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  total: number;
  category: string;
  quantity: number;
}


@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
products:any;
category :any;


// details:ProductDetail ={};
// detailsArray: any ={};

user ={
  name: '',
  email:'',
  contact:'',
  payment :''
}

details: ProductDetail = {
  id: 0,
  name: '',
  price: 0,
  total: 0,
  category: '',
  quantity: 0
};



  constructor(private productData: ProductService, private categoryData: CategoryService, private orderDetails: BillsService, private toastr: ToastrService){}
  loadProduct(){
    this.productData.getProducts().subscribe((data)=>{
      this.products = data;
      console.log(this.products);
    })
  }

  loadCategory(){
    this.categoryData.getCategories().subscribe((data)=>{
      this.category = data;
      console.log(this.products);
    })
  }
  ngOnInit(): void {
    this.loadCategory();
    this.loadProduct();
  }


productDetailsList: ProductDetail[] = [];

addDetail() {
  if (this.details.name && this.details.price && this.details.quantity && this.details.category){

  this.details.total = this.details.price * this.details.quantity;


  this.productDetailsList.push({ ...this.details });

  this.details = {
    id: 0,
    name: '',
    price: 0,
    total: 0,
    category: '',
    quantity: 0
  };
  console.log(this.productDetailsList);
}}

calculateTotal() {
  let total = 0;
  for (const detail of this.productDetailsList) {
    total += detail.total;
  }
  return total;
}




createOrder(formData:any){
  console.log(formData)
  const orderData = {
    user: formData,
    productDetailsList: this.productDetailsList,
    total :this.calculateTotal(),
  };
  console.log(orderData)

  this.orderDetails.addOrder(orderData).subscribe((orderData)=>{

      this.toastr.success('Bill has been submitted');
  })

}
}
