import { Component } from '@angular/core';
import { ShopingcartService } from '../../services/shopingcart.service';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-shopingcart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopingcart.component.html',
  styleUrl: './shopingcart.component.css'
})
export class ShopingcartComponent {
  constructor(private cartService: ShopingcartService) {}

  get cartItems() {
    return this.cartService.getCartItems();
  }
  isOpen() : boolean {
    return this.cartService.isCartOpen();
  }
  closeCart(): void {
    this.cartService.toggleCartVisibility();
  }
  removeItem(item: Iproduct): void {
    this.cartService.removeItemFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

}
