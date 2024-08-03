import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserstatusService {
  private islogged: boolean = false;
  private userRoles: string[] = [];

  constructor() {}

  getLogged(): boolean {
    return this.islogged;
  }
  getRoles(): any {
    return this.userRoles;
  }
  setLogged(status: boolean): void {
    this.islogged = status;
  }
  setRoles(roles: string[]): void {
    this.userRoles = roles;
  }
}
