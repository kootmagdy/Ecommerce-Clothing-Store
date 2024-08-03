import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent implements OnInit {
  userForm = new FormGroup({
 userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
   password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)]),
    address: new FormControl('', [Validators.required])
  });
  userId: any;
  user: any;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.userId = params['id'];
        this.userForm.reset(); // Reset the form on init
      },
    });
  }

  get getname() {
    return this.userForm.get('userName');
  }

  get getpassword() {
    return this.userForm.get('password');
  }

  get getconfirmpassword() {
    return this.userForm.get('confirmPassword');
  }

  get getaddress() {
    return this.userForm.get('address');
  }


  
  userHandler() {
    if (this.userForm.valid) {
      if (!this.userId) { // Assuming userId is null or undefined for new users
        this.registerService.addNewUser(this.userForm.value).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err)=>{
            console.log("reg error : ",err)
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }


  
}