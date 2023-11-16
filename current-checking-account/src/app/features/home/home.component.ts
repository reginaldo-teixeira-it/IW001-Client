import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import {MatIconModule} from '@angular/material/icon';


// Models
import { CurrentAccountStatementModel } from '../../core/models';
import { Observable } from 'rxjs';
import { DataBankService } from 'src/app/core/services/databank.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DataBankModalComponent } from '../modal/data-bank-modal/data-bank-modal.component';
import { SpinnerInterceptor } from '../../core/interceptors/spinner.interceptor';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  databankList: CurrentAccountStatementModel[] = [];

  constructor(
    private dataBankService: DataBankService,
    private notificationService: NotificationService
  ) { }

  // ngOnInit(): void {
  //   this.dataBankService.getAll().subscribe((data: CurrentAccountStatementModel[]) => {
  //     this.databankList = data; // Atribuir os dados retornados ao objeto
  //     console.log('Data > '+data);
  //   });

  //   setTimeout(() => {
  //     console.clear();
  //     console.log('aa');
  //     this.notificationService.openSnackBar('IW001 - Home Data Bank Welcome!');
  //   }, 2000);

  // }
}


