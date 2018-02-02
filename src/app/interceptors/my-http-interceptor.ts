import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpService } from '../http.service';
import { environment } from '../../environments/environment';

@Injectable()

export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const match:string = environment['apiBase'] + '/do_vote';
        if (req.url == match) {
            const token = localStorage.getItem('currentUser');
            const newRequest = req.clone({
                headers: req.headers.set(
                    'access_token',
                    token
                )
            });
            return next.handle(newRequest);
        } else {
            return next.handle(req);
        }
    }
}