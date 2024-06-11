import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusySpinnerService } from '../_services/busy-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busySpinnerService: BusySpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busySpinnerService.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.busySpinnerService.idle()
      })
    );
  }
}
