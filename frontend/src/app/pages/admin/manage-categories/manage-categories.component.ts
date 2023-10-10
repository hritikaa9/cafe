import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{CategoryService} from '../../../services/category.service';
@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

category : any;
searchQuery: string = '';
  constructor(private categoryDetail: CategoryService){
  }

loadCategory(){
  this.categoryDetail.getCategories().subscribe((data) =>{
    this.category = data;
    // console.log(data)
  
   })
}

  categoryData(data: any){
    this.categoryDetail.addCategory(data).subscribe((data)=>{
      // console.log(data);



      this.loadCategory();
      this.category = '';
    
    })
  }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.loadCategory();
    } else {
      this.category = this.category.filter((item:any) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  deleteCategory(id :any){
    this.categoryDetail.deleteCategory(id).subscribe((data)=>{
      console.log(data)
      const index = this.category.findIndex((item :any) => item.id === id);
      
      if (index !== -1) {
        this.category.splice(index, 1);
      }

    })
  }

  ngOnInit(): void{
    this.loadCategory();
  }

}
