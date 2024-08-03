import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductWihApiService } from '../../services/product-wih-api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Iproduct[];
  constructor(public productService: ProductWihApiService) {
    this.products = [];
  }
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteHandler(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id != productId
        );
      },
      error: () => {},
    });
  }
}
