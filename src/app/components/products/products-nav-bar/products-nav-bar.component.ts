import { Component, OnInit, Output } from '@angular/core';
import { EventDriverService } from 'src/app/state/event.driver.service';
import {  ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
 
  //@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  
  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }
  onGetAllProducts(){
  //this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS,payload:null});
  this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS,payload:null});  
}

  onGetSelectedProducts(){
   // this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS,payload:null});
   this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS,payload:null});
  }

  onGetAvialableProducts(){
   // this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS,payload:null});
   this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS,payload:null});
  }

  onNewProduct(){
    //this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT,payload:null});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT,payload:null});
  }

  onSearch(dataForm:any){
    //this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:dataForm
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:null
    });
    
  }
  

}
