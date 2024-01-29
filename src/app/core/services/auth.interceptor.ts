import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, TimeoutError, catchError, finalize, from, map, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { MessageService } from 'primeng/api';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(request: HttpRequest<any>, next: any) {
    const started = Date.now();
    //not configuret yet
    let token = this.token.getToken();
    
    if (token) {
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    

    // Important: Note the .toPromise()
    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const statusCode = event['body']?.status;

            this.statusCodeHandle(statusCode, request, next, event);
          }
          return event;
        }),

        catchError((error: HttpErrorResponse) => {
          // Handle 'timeout over' error
          if (error instanceof TimeoutError) {
            this.statusCodeHandle(408, request, next, error);
            return throwError('Timeout Exception');
          }

          this.statusCodeHandle(error.status, request, next, error);
          return throwError(error);
        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}"  in ${elapsed} ms.`;
        })
      )
      .toPromise();
  }
  statusCodeHandle(statusCode: number, request: HttpRequest<any>, next: HttpHandler, resp: any) {
    switch (statusCode) {
      case 400:
        // put code when API return 400
        break;
      case 401:
        // put code when API return 400
        break;
      case 500:
        this.messageService.add({ severity: 'warning', summary: 'Error System', detail: `${statusCode}` });
        break;
      case 502:
        this.messageService.add({ severity: 'warning', summary: 'Bad Gateway', detail: `${statusCode}` });
        break;
      default:
        break;
    }
  }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
