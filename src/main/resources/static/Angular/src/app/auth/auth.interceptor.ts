import {Inject, Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { switchMap} from "rxjs/operators";
import {NB_AUTH_INTERCEPTOR_HEADER, NbAuthJWTToken, NbAuthService} from "@nebular/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector,
                @Inject(NB_AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization') {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


        return this.authService.getToken()
            .pipe(
                switchMap((token: NbAuthJWTToken) => {
                    if (token && token.getValue()) {
                        request = request.clone({
                            setHeaders: {
                                [this.headerName]: token.getValue(),
                            },
                        });
                    }
                    return next.handle(request);
                }),
            );
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }
}
