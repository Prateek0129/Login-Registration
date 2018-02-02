import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable()

export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req.url == "https://secure-refuge-14993.herokuapp.com/do_vote", req.url);
        if (req.url == "https://secure-refuge-14993.herokuapp.com/do_vote") {
            console.log();
            const token = localStorage.getItem('currentUser');
            const newRequest = req.clone({
                headers: req.headers.set(
                    'access_token',
                    token
                )
            });
            console.log(typeof (req.url));
            return next.handle(newRequest);
        } else {
            return next.handle(req);
        }
    }
}