 import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product:Product;
  //@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService:EventDriverService)
   { }

  ngOnInit(): void {
  }
  onSelect(product:Product){
      /* this.eventEmitter.emit({
         type:ProductActionsTypes.SELECT_PRODUCT,
       });*/
       this.eventDrivenService.publishEvent({
        type:ProductActionsTypes.SELECT_PRODUCT,
        payload:product
      });
      
  }
  onDelete(product:Product){ 
    /*this.eventEmitter.emit({
      type:ProductActionsTypes.DELETE_PRODUCT,
        
    });*/
    this.eventDrivenService.publishEvent({
      type:ProductActionsTypes.DELETE_PRODUCT,
      payload:product
    });

    console.log("hiiii deleted");
  }
  onEdite(product:Product){
   /* this.eventEmitter.emit({
      type:ProductActionsTypes.EDIT_PRODUCT,
      payload:product
    });*/
    this.eventDrivenService.publishEvent({
      type:ProductActionsTypes.EDIT_PRODUCT,payload:product
    });
    console.log("hiiii edite");
  }
}
