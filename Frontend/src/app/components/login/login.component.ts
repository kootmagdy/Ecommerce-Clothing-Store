// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from '../../services/login.service';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   loginError: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private loginService: LoginService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       userName: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { userName, password } = this.loginForm.value;
//       this.loginService.login(userName, password).subscribe(
//         () => {
//           this.router.navigate(['/home']); // Navigate to a home or dashboard page
//         },
//         (error) => {
//           this.loginError = 'Invalid username or password.';
//         }
//       );
//     }
//   }

//   onLogout() {
//     this.loginService.logout().subscribe(() => {
//       this.router.navigate(['/login']);
//     });
//   }
// }

import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserstatusService } from '../../services/userstatus.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FooterComponent,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
    ]),
  });
  loginError: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private userStatus: UserstatusService
  ) {}

  ngOnInit(): void {
    this.loginForm.reset(); // Reset the form on init
  }

  get getUserName() {
    return this.loginForm.get('userName');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.value.userName!;
      const password = this.loginForm.value.password!;
      this.loginService.login(userName, password).subscribe({
        next: async () => {
          try {
            const response = await this.authService.getStatus().toPromise();
            this.userStatus.setLogged(response.isAuthenticated);
            this.userStatus.setRoles(response.roles || []);
          } catch (error) {
            this.userStatus.setLogged(false);
            this.userStatus.setRoles([]);
          }
          this.router.navigate(['/']); // Navigate to home or dashboard
        },
        error: () => {
          this.loginError = 'Invalid username or password.';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
