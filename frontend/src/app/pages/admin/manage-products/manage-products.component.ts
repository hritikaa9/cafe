import { Component, OnInit ,AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import{CategoryService} from '../../../services/category.service';
import { PaginationComponent } from './pagination/pagination.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;
export interface P{
  name:any;
  categoryname: any;
  description: any;
  price: any;

}

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
  // encapsulation: ViewEncapsulation.None, 
})


export class ManageProductsComponent implements OnInit{

 currentPage: number = 1;
 itemsPerPage: number = 6;
 totalProducts: any = 0;
 editproducts: any;
 category :any;
 searchQuery: string ='';
 selectedCategoryId :any;

 product = { 
  id :'',
 name: '', 
 price: '', 
 category_id: '', 
 description: '',
 categoryname: '',
}

products_detail :any
  displayedColumns: string[] = ['name', 'categoryname', 'description', 'price', 'edit', 'delete']; 
  dataSource: any;
  products: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private productDetail : ProductService, private categoryDetail: CategoryService ){
    this.products_detail = new FormGroup({
      id :new FormControl(),
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category_id: new FormControl(),
      description: new FormControl('', Validators.required),
      categoryname: new FormControl(),
      selectedCategoryId: new FormControl()
    })
  }

  get id(){
    return this.products_detail.get('id')
  }

  get name(){
    return this.products_detail.get('name')
  }

  get price(){
    return this.products_detail.get('price')
  }

  get category_id(){
    return this.products_detail.get('category_id')
  }

  get description(){
    return this.products_detail.get('description')
  }
  get categoryname(){
    return this.products_detail.get('categoryname')
  }

  onFormSubmit() {

    if (this.products_detail.value.id) {
      this.updateProduct(this.product);
    } else {
      this.addProduct(this.product);
    }
  }
  
  addProduct(data: any){
    this.product = { ...this.products_detail.value };
    this.product.category_id = this.products_detail.value.selectedCategoryId;
    this.productDetail.addProduct(this.product).subscribe((data)=>{
      this.loadProduct();
      this.products_detail.reset();
    })
  }
  updateProduct(data: any) {
    this.product.category_id = this.selectedCategoryId;
    this.product = {...this.products_detail}
    this.productDetail.updateProduct(this.product, this.product.id).subscribe((updatedData) => {
      console.log(updatedData);
      this.loadProduct()
      const index = this.products.findIndex((item: any) => item.id === this.product.id);
  
      if (index !== -1) {
  
        this.products[index] = updatedData;
        this.dataSource.data = this.products;
        console.log(this.dataSource.data)
      }
    });
  }
  

  loadProduct() {
    this.productDetail.getProducts().subscribe((data) => {
  this.products = data;

  this.dataSource = new MatTableDataSource<P>(this.products)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    });
  }



  onPageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.loadProduct(); 
  }

  loadCategory(){
  this.categoryDetail.getCategories().subscribe((data) =>{
    this.category = data;
   })
}



onSearch() {
  if (this.searchQuery.trim() === '') {
    this.loadProduct(); 
  } else {

    this.dataSource.data = this.products.filter((item: any) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

deleteProduct(id: any) {
  this.productDetail.deleteProduct(id).subscribe((data) => {
    console.log(data);
    const index = this.products.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.dataSource = new MatTableDataSource<P>(this.products); // Update the dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  });
}







getById(id: any) {
  $('#productModal').modal('show');
  this.productDetail.getProductById(id).subscribe((data: any) => {
    
    this.product = {...data[0]}
    // console.log(this.product);
    // this.product.id = data[0].id;
    // console.log(this.product.id);
    // this.product.name = data[0].name;
    // this.product.price = data[0].price;
    // this.product.description = data[0].description;
    // this.product.categoryname = data[0].categoryname;
    this.selectedCategoryId = data[0].category_id;
  });
}

openModal() {
  this.product = {
    id: '',
    name: '',
    price: '',
    category_id: '',
    description: '',
    categoryname: ''
  };
  $('#productModal').modal('show');
}

clearForm() {
  this.product = {
    id: '',
    name: '',
    price: '',
    category_id: '',
    description: '',
    categoryname: ''
  };
}

  ngOnInit(): void{
    this.loadProduct();
    this.loadCategory();
    
   
  }

  ngAfterViewInit(): void {
    $('#example').DataTable({
      paging: true,
      pageLength: 10,
      lengthMenu: [5, 10, 50, 100],
      // dom: '<"top"lfrtip>rt<"bottom"ip><"clear">', 
      dom: '<"top"lf>t<"bottom"ip><"clear">',
      
    });
  }

}