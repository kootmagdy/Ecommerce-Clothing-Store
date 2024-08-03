import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserstatusService } from '../../services/userstatus.service';
import { ShopingcartService } from '../../services/shopingcart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRoles: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStatus: UserstatusService,
    private cartService: ShopingcartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.userStatus.getLogged();
    this.userRoles = this.userStatus.getRoles();
  //  console.log(
   //   'from navbar: islogged: ' + this.isLoggedIn + '  role: ' + this.userRoles
  //  );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.userRoles = [];
      this.router.navigate(['/login']);
    });
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  toggleShoppingCart(): void {
    this.cartService.toggleCartVisibility(); // Example method in shopping cart service
  }
}
