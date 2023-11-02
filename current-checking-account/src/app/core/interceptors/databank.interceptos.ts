import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DataBankService } from '../services/databank.service';

@Injectable()
export class DataBankInterceptor implements HttpInterceptor {

  constructor(private dataBankService: DataBankService, private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone();

    return next.handle(cloned).pipe(
      tap(
        () => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.dialog.closeAll();
              // Redirecionar para a página de login ou outro tratamento apropriado
              // Por favor, ajuste o redirecionamento para sua rota de login específica
              // this.router.navigate(['../../features/account/auth/login']);
            }
          }
        }
      )
    );
  }
}
