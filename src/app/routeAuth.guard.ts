import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
@Injectable()
export class RouteAuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.httpService.currentUser()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
