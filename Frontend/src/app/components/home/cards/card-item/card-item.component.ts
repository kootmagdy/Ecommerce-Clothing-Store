import { NgIf } from '@angular/common';
import { Component,Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ShopingcartService } from '../../../../services/shopingcart.service';
import { Iproduct } from '../../../../models/iproduct';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  constructor(private cartService: ShopingcartService) {}
  buttonText = 'Buy Now';
  @Input() product!: Iproduct;

  addToCart(product: Iproduct): void {
    this.buttonText = 'Adding...';
    this.cartService.addItemToCart(product);

    setTimeout(() => {
      this.buttonText = 'Buy Now';
    }, 1100);
  }

}
