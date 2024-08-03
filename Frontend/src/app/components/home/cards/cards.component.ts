import { Component, OnInit } from '@angular/core';
import { CardItemComponent } from './card-item/card-item.component';
import { NgFor } from '@angular/common';
import { ProductWihApiService } from '../../../services/product-wih-api.service';



@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardItemComponent,NgFor],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
constructor( private productService : ProductWihApiService){}

  products : any = [];

  labtops : any = []
  
  ngOnInit(){
    
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

  
    //labtops just for testing 
    this.labtops = [
      {
        image: 'assets/img/1.jpg',
        name: 'ASUS Rog',
        price: '12354.00',
        quantity: 12,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/2.jpg',
        name: 'HP Pavilion',
        price: '9000.00',
        quantity: 14,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/3.jpg',
        name: 'Dell XPS',
        price: '15000.00',
        quantity: 0,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/4.jpg',
        name: 'Lenovo ThinkPad',
        price: '11000.00',
        quantity: 7,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/5.jpg',
        name: 'Acer Nitro',
        price: '8500.00',
        quantity: 1,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/6.jpg',
        name: 'MSI Gaming Laptop',
        price: '14000.00',
        quantity: 6,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/7.jpg',
        name: 'ASUS Rog',
        price: '12354.00',
        quantity: 15,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
      {
        image: 'assets/img/8.jpg',
        name: 'HP Pavilion',
        price: '9000.00',
        quantity: 10,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore'
      },
    ];
  }

}

