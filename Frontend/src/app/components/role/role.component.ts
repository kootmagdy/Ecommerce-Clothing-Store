import { RoleService } from './../../services/role.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  roleError: string | null = null;

  constructor(
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleForm.reset(); // Reset the form on init
  }

  get getRoleName() {
    return this.roleForm.get('roleName');
  }



  onSubmit() {
    if (this.roleForm.valid) {
     const roleName = this.roleForm.value.roleName!;
      this.roleService.addRole(roleName).subscribe({
        next: () => {
          this.router.navigate(['/role']); // Navigate to home or dashboard
        },
        error: (err:any) => {
          this.roleError = 'Invalid Role Name maybe already exists. or you are not have permission \n ' + err;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}





