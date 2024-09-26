import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let url: string = `${environment.API_URL_BASE}/${req.url}`;
  return next(req.clone({ url }));
};
