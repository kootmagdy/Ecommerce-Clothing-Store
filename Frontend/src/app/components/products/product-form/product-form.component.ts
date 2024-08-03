import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductWihApiService } from '../../../services/product-wih-api.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NavbarComponent,FooterComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  });
  productId: any;
  product: any;
  constructor(
    public productServices: ProductWihApiService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.productId = this.activatedRoute.snapshot.params['id'];//
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getName.setValue('');
        this.getPrice.setValue(null);
        this.getQuantity.setValue(null);
        this.getDescription.setValue(null);
        this.getImage.setValue(null);
      },
    });
    if (this.productId != 0) {
      this.productServices.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.getName.setValue(this.product.name);
          this.getPrice.setValue(this.product.price);
          this.getQuantity.setValue(this.product.quantity);
          this.getDescription.setValue(this.product.description);
          this.getImage.setValue(this.product.image);
        },
      });
    }
  }

  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice() {
    return this.productForm.controls['price'];
  }

  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  get getDescription() {
    return this.productForm.controls['description'];
  }

  get getImage() {
    return this.productForm.controls['image'];
  }

  productHandler() {
    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        this.productServices.addNewProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      } else {
        // edit
        this.productServices
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
          });
      }
    } else {
      console.log('Form inValid');
    }
  }
}
