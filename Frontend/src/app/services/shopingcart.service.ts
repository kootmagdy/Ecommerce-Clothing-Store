import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShopingcartService {

  constructor() { }
  private isCartVisible: boolean = false;
  private cartItems: Iproduct[] = [];
  private totalPrice: number = 0;
  getTotalPrice(): number {
    return this.totalPrice;
  }
  toggleCartVisibility(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  isCartOpen(): boolean {
    return this.isCartVisible;
  }

  getCartItems(): Iproduct[] {
    return this.cartItems;
  }

  addItemToCart(item: Iproduct): void {
    this.cartItems.push(item);
    this.updateTotalPrice();
  }

  removeItemFromCart(item: Iproduct): void {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateTotalPrice();
    }
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
