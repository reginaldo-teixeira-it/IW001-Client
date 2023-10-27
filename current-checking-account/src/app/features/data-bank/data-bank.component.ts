import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import {MatIconModule} from '@angular/material/icon';

// Models
import { DataBankModel } from '../../core/models';
import { Observable } from 'rxjs';
import { DataBankService } from 'src/app/core/services/databank.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DataBankModalComponent } from '../modal/data-bank-modal/data-bank-modal.component';
// export interface DataBankElement {
//   id: number;
//   description: string;
//   startdate: string;
//   value: number;
//   loose: string;
//   state: string;
// }
// const ELEMENT_DATA: DataBankElement[] = [
//   { id: 1, description: 'Compra no supermercado', startdate: '2023-10-25', value: 50.55, loose: '---', state: 'true' },
//   { id: 2, description: 'Aluguel', startdate: '2023-10-20', value: 1317.57, loose: '---', state: 'true' },
//   { id: 3, description: 'Restaurante', startdate: '2023-10-15', value: 75.23, loose: '---', state: 'true' }
// ];


// this.dataBankService.getAll().subscribe((data: DataBankModel[]) => {
//   this.databankList = data; // Atribuir os dados retornados ao objeto
//   this.dataSource = new MatTableDataSource(this.databankList); // Atualize a dataSource
//   this.dataSource.sort = this.sort;
//   console.log(data);
// });

@Component({
  selector: 'app-data-bank',
  templateUrl: './data-bank.component.html',
  styleUrls: ['./data-bank.component.css']
})

export class DataBankComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'startdate', 'value', 'loose', 'state','action'];
  dataSource = new MatTableDataSource<DataBankModel>([]);

  @ViewChild(MatPaginator) pagination !:MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  databankList: DataBankModel[] = [];

  constructor(
    private dialog: MatDialog,
    private titleService: Title,
    private notificationService: NotificationService,
    private dataBankService: DataBankService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('IW001 - Data Bank');
    this.dataSource.sort = this.sort;
    this.loaddatabank();
    setTimeout(() => {
      this.notificationService.openSnackBar('IW001 - Data Bank Welcome!');
    });
  }

  loaddatabank() {
    this.dataBankService.getAll().subscribe((data: DataBankModel[]) => {
      this.databankList = data; // Atribuir os dados retornados ao objeto
      this.dataSource = new MatTableDataSource(this.databankList); // Atualize a dataSource
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.pagination;
      console.log(data);
    });
  }

  SearchFilter(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  update(id: any) {
    console.log('Id Recebido '+id);
    this.OpenModal(id, 'Edit', DataBankModalComponent);
  }

  OpenModal(id: any, title: any,component:any) {
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
