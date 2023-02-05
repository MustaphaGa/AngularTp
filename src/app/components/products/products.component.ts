import { Component, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import {ProductsService } from './../../services/products.service';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes,} from '../../state/product.state';
import {catchError,map,startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import {EventDriverService} from '../../state/event.driver.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products$:Observable<AppDataState<Product[]>>;
readonly  DataStateEnum=DataStateEnum;

  constructor(
    private productsService:ProductsService, private router:Router,
    private eventDrivenService:EventDriverService 
    
    ) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>
    {
      this.onActionEvent(actionEvent);
    });
  }

 onGetAllProducts(){
 
 

    this.products$=this.productsService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LAODED,data:data})),
      startWith({dataState:DataStateEnum.LAODING}),
      catchError(err=>of({datastate:DataStateEnum.ERROR,errorMessage:err.message}))
    );
    console.log("hiiiiii");
 
 }
 onGetSelectedProducts(){
  this.products$=this.productsService.getSelectedProducts().pipe(
    map(data=>({dataState:DataStateEnum.LAODED,data:data})),
    startWith({dataState:DataStateEnum.LAODING}),
    catchError(err=>of({datastate:DataStateEnum.ERROR,errorMessage:err.message}))
  );
  console.log("SELECTED");


 }
 onGetAvialableProducts(){
  this.products$=this.productsService.getAvialableProducts().pipe(
    map(data=>({dataState:DataStateEnum.LAODED,data:data})),
    startWith({dataState:DataStateEnum.LAODING}),
    catchError(err=>of({datastate:DataStateEnum.ERROR,errorMessage:err.message}))
  );
  console.log("AVIALABLE");


 }
 onSearch(dataForm: any){
  this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(
    map(data=>({dataState:DataStateEnum.LAODED,data:data})),
    startWith({dataState:DataStateEnum.LAODING}),
    catchError(err=>of({datastate:DataStateEnum.ERROR,errorMessage:err.message}))
  );
  console.log("Searching");

 }
 onSelect(p: Product){
  this.productsService.select(p).subscribe(data=>{
    p.selected=data.selected;
  })
 }
  onDelete(p: Product){
    let v=confirm("etes vous sure?");
  if(v==true)
    this.productsService.deleteProduct(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  
 }
 onNewProduct(){
this.router.navigateByUrl("/newProduct");
  
 }
 onEdite(p){
  this.router.navigateByUrl("/editProduct/"+p.id);
    
   }
onActionEvent($event: ActionEvent){
        switch($event.type){
          case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
          case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
          case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvialableProducts();break;
          case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
          case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct();break;
          case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
          case ProductActionsTypes.EDIT_PRODUCT: this.onEdite($event.payload);break;
          case ProductActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
          

        }
 
  }

    
   }

