import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{CategoryService} from '../../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

category : any;
categories : any;
searchQuery: string = '';
  constructor(private categoryDetail: CategoryService){
    this.category = new FormGroup({
      name:new FormControl('', Validators.required),
    })
  }

  get name(){
    return this.category.get('name')
  }
loadCategory(){
  this.categoryDetail.getCategories().subscribe((data) =>{
    this.categories = data;
    this.category.value = this.categories
    console.log(this.categories);
    
  
   })
}

  categoryData(){
    this.categoryDetail.addCategory(this.category.value).subscribe((data)=>{

      this.loadCategory();
      this.category.value.name = '';
      console.log(this.category.value);
      
    })
  }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.loadCategory();
    } else {
      this.categories = this.categories.filter((item:any) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  deleteCategory(id :any){
    this.categoryDetail.deleteCategory(id).subscribe((data)=>{
      console.log(data)
      const index = this.categories.findIndex((item :any) => item.id === id);
      
      if (index !== -1) {
        this.categories.splice(index, 1);
      }

    })
  }

  ngOnInit(): void{
    this.loadCategory();
  }

}