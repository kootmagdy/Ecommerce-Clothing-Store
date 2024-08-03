

import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { UserstatusService } from './services/userstatus.service';
import { ShopingcartComponent } from './components/shopingcart/shopingcart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet,FooterComponent,ShopingcartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit  {
  title = 'demo';

  constructor(private authService: AuthService , private userStatus: UserstatusService) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.authService.getStatus().toPromise();
      this.userStatus.setLogged(response.isAuthenticated);
      this.userStatus.setRoles(response.roles || []);
    } catch (error) {
      this.userStatus.setLogged(false);
      this.userStatus.setRoles([]);
    }
  }

}
