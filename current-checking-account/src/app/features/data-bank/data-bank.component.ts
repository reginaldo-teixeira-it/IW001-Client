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
  selector: 'app-data-bank',
  templateUrl: './data-bank.component.html',
  styleUrls: ['./data-bank.component.css']
})

export class DataBankComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'value','startdate', 'loose', 'state','action'];
  dataSource = new MatTableDataSource<CurrentAccountStatementModel>([]);
  isHiddenColumn: boolean = true;

  @ViewChild(MatPaginator) pagination !:MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  databankList: CurrentAccountStatementModel[] = [];

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private notificationService: NotificationService,
    private dataBankService: DataBankService,
    private spinner : SpinnerService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('IW001 - Data Bank');
    this.dataSource.sort = this.sort;
    this.spinner.show();

    this.loaddatabank();


    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.notificationService.openSnackBar('IW001 - Data Bank Welcome!');
    }, 5000);
  }

  loaddatabank() {
    this.dataBankService.getAll().subscribe((data: CurrentAccountStatementModel[]) => {
      this.databankList = data; // Atribuir os dados retornados ao objeto
      this.dataSource = new MatTableDataSource(this.databankList); // Atualize a dataSource
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.pagination;
    });
  }

  SearchFilter(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  addStartement(){
    this.OpenModalForm(0, 'Add',DataBankModalComponent);
  }

  update(id: any) {
    this.OpenModalForm(id, 'Edit', DataBankModalComponent);
  }

  delete(id: any) {
    this.OpenModalForm(id, 'Cancel', DataBankModalComponent);
  }

  filter(){

  }

  filterRangeData(){

  }

  OpenModalForm(id: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loaddatabank();
    })

  }


}
