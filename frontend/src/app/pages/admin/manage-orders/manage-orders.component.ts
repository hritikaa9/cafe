import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import{CategoryService} from '../../../services/category.service';
import{ProductdetailsService} from '../../../services/productdetails.service';
import { BillsService } from 'src/app/services/bills.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface ProductDetail {
  id: number;
  named: string;
  price: number;
  total: number;
  categoryd: string;
  quantity: number;
}


@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
products:any;
categories :any;


// user ={
//   name: '',
//   email:'',
//   contact:'',
//   payment :''
// }

user : any;


details: ProductDetail = {
  id: 0,
  named: '',
  price: 0,
  total: 0,
  categoryd: '',
  quantity: 0
};

details_extra : any;

emailRegex: string ="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"


  constructor(private productData: ProductService, private categoryData: CategoryService, private orderDetails: BillsService, private toastr: ToastrService){
this.user = new FormGroup({
  name :new FormControl('', Validators.required),
  email :new FormControl('',[
    Validators.required,
    Validators.pattern(this.emailRegex)
   ]),
  contact :new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]),
  payment :new FormControl('', Validators.required)
}),

this.details_extra= new FormGroup({
  id : new FormControl(),
  named :new FormControl('', Validators.required),
  price :new FormControl('', Validators.required),
  total :new FormControl('', Validators.required),
  categoryd :new FormControl(),
  quantity :new FormControl('', Validators.required),

})
  }

  get name(){
    return this.user.get('name')
  }

  get email(){
    return this.user.get('email')
  }

  get contact(){
    return this.user.get('contact')
  }

  get payment(){
    return this.user.get('payment')
  }

  get id(){
    return this.details_extra.get('id')
  }

  get named(){
    return this.details_extra.get('named')
  }
  get price(){
    return this.details_extra.get('price')
  }
  get total(){
    return this.details_extra.get('payment')
  }
  get categoryd(){
    return this.details_extra.get('categoryd')
  }
  get quantity(){
    return this.details_extra.get('quantity')
  }

  
  loadProduct(){
    this.productData.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }

  loadCategory(){
    this.categoryData.getCategories().subscribe((data)=>{
      this.categories = data;
  
    })
  }
  ngOnInit(): void {
    this.loadCategory();
    this.loadProduct();
  }


productDetailsList: ProductDetail[] = [];

addDetail() {
this.details = { ...this.details_extra.value };
  this.details.total = this.details.price * this.details.quantity;


  this.productDetailsList.push({ ...this.details });

  console.log('productDetailsList', this.productDetailsList)

 

  this.details_extra.reset();


}

calculateTotal() {
  let total = 0;
  for (const detail of this.productDetailsList) {
    total += detail.total;
  }
  return total;
}




createOrder(){
  const orderData = {
    user: this.user.value,
    productDetailsList: this.productDetailsList,
    total :this.calculateTotal(),
  };
  console.log('eee',orderData)
  this.orderDetails.addOrder(orderData).subscribe((orderData)=>{
  
    this.details_extra.reset();
    this.user.reset();
    this.productDetailsList =[]
      this.toastr.success('Bill has been submitted');
  },

  )

}
}
