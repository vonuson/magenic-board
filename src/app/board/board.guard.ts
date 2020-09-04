import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class BoardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = Number(route.url[0].path);
    if (isNaN(id) || id < 1) {
      this.router.navigateByUrl('/board');
      return false;
    }
    return true;
  }
}
