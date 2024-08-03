import { CardsComponent } from './cards/cards.component';
import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,AboutComponent,CardsComponent,NavbarComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
