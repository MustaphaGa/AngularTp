import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
productId :number;
productformGroup:FormGroup;
 submitted:boolean=false;

  constructor( 
    private activateRoute:ActivatedRoute, 
    private productsService : ProductsService,
    private fb:FormBuilder,
    private eventDrivenService:EventDriverService) {
    this.productId=activateRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.productsService.getProducts(this.productId)
    .subscribe(product=>{
       this.productformGroup=this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
       price:[product.price, Validators.required],
       quantity:[product.quantity, Validators.required],
       selected:[product.selected, Validators.required],
       avialable:[product.avialable, Validators.required]
       })

    })
  }
  onUpdateProduct(){
    this.productsService.updateProduct(this.productformGroup.value)
    .subscribe(data=>{
      this.eventDrivenService.publishEvent({type:ProductActionsTypes. PRODUCT_UPDATED})
      alert("success product apdate");
    })


  }

}
