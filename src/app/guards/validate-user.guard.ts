import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!localStorage.getItem('userName')) {
      this.router.navigateByUrl('/auth')
      return false;
    } else {
      return true;
    }
    //return !localStorage.getItem('userName') ? true : false
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

    if (!localStorage.getItem('userName')) {
      this.router.navigateByUrl('/auth')
      return false;
    } else {
      return true;
    }

    //return  !localStorage.getItem('userName') ? true : false;
  }
}
