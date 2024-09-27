import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { SessionService } from '@app/authentication';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);
  let url: string = `${environment.API_URL_BASE}/${req.url}`;
  let headers = req.headers;
  if (session.session){
    headers = headers.append('authorization', `bearer ${session.session.token}`);
  }
  return next(req.clone({ url, headers }));
};
