import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataBankService } from '../../../core/services/databank.service';
import { CurrentAccountStatementModel } from 'src/app/core/models';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-data-bank-modal',
  templateUrl: './data-bank-modal.component.html',
  styleUrls: ['./data-bank-modal.component.css']
})
export class DataBankModalComponent implements OnInit {
  inputdata: any;
  editdata: any;
  isDisabled = true;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DataBankModalComponent>, private buildr: FormBuilder,
    private service: DataBankService) {
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      console.log('Id na Modal ' + this.inputdata.id)
      this.setmodalData(this.inputdata.id)
    }
  }

  setmodalData(id: any) {
    this.service.getByID(id).subscribe(item => {
      this.editdata = item;
      console.log(item);
      this.databankform.setValue({
        id: this.editdata.id,
        description: this.editdata.description,
        startdate: this.editdata.startDate,
        value: this.editdata.value,
        loose: this.editdata.loose.toString(),
        state: this.editdata.state.toString(),
      })
      console.log('Data : ' + this.editdata.startDate);
    });


  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  databankform = this.buildr.group({
    id: this.buildr.control(''),
    description: this.buildr.control(''),
    startdate: this.buildr.control(''),
    value: this.buildr.control(''),
    loose: this.buildr.control(false),
    state: this.buildr.control(true)
  });

  SaveData() {
    const idValue = this.databankform.get('id')?.value;
    const _id = idValue ? parseInt(idValue, 10) : 0;

    const description = this.databankform.get('description')?.value || '';

    const startdateValue = this.databankform.get('startdate')?.value || '';
    const startDate = startdateValue ? new Date(startdateValue) : new Date();
    //const startDateIn = formatarDataHora(startDate);

    const value = parseFloat(this.databankform.get('value')?.value || '0.00')

    const looseValue = this.databankform.get('loose')?.value;
    const Loose = looseValue !== null ? looseValue : false;

    const stateValue = this.databankform.get('state')?.value;
    const State = stateValue !== null ? stateValue : false;

    const formMetodh = this.inputdata.title;

    console.log('formMetodh: ' + formMetodh);
    console.log('Id: ' + _id);
    console.log('description: ' + description);
    console.log('startDate: ' + formatarDataHora(startDate));
    console.log('value: ' + value);
    console.log('Loose: ' + Loose);
    console.log('State: ' + State);

    const dataToSave: CurrentAccountStatementModel = {
      id: _id,
      description: this.databankform.get('description')?.value || '',
      startdate: startDate,
      value: value,
      loose: Loose || false,
      state: State || false,
    };

    console.log('dataToSave > ' + JSON.stringify(dataToSave));
    switch (formMetodh) {
      case "Add":
        {
          this.service.Create(dataToSave).subscribe(res => {
            this.closepopup();
          });
        }
        break;
        case "Edit":
          {
            this.service.Update(dataToSave).subscribe(res => {
              this.closepopup();
            });
          }
        break;
        case "Cancel":
          {
            if (_id > 0) {
              this.service.Cancel(dataToSave).subscribe(res => {
                this.closepopup();
              });
            }
          }
        break;
      default:
        console.log("not implemented");
    }
  }

  removeData() {
    const idValue = this.databankform.get('id')?.value;
    const _id = idValue ? parseInt(idValue, 10) : 0;
    this.service.Cancel(idValue).subscribe(res => {
      this.closepopup();
    });
  }

}

function formatarDataHora(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é base 0
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}
