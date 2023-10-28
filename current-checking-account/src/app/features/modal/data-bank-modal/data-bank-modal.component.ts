import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataBankService } from '../../../core/services/databank.service';
import { DataBankModel } from 'src/app/core/models';


@Component({
  selector: 'app-data-bank-modal',
  templateUrl: './data-bank-modal.component.html',
  styleUrls: ['./data-bank-modal.component.css']
})
export class DataBankModalComponent implements OnInit {
  inputdata: any;
  editdata: any;
  isStatusDisabled: boolean = false;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DataBankModalComponent>, private buildr: FormBuilder,
    private service: DataBankService) {

  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      console.log('Id na Modal '+this.inputdata.id)
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
        loose: this.editdata.loose,
        state: this.editdata.state.toString(),
      })
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  databankform = this.buildr.group({
    id:this.buildr.control(''),
    description: this.buildr.control(''),
    startdate: this.buildr.control(''),
    value: this.buildr.control(''),
    loose: this.buildr.control(''),
    state: this.buildr.control(true)
    });

  SaveData() {
    const idValue = this.databankform.get('id')?.value;
    const _id = idValue ? parseInt(idValue, 10) : 0;

    const dataToSave: DataBankModel = {
      id: _id,
      description: this.databankform.get('description')?.value || '',
      startdate: this.databankform.get('startdate')?.value || '',
      value: parseFloat(this.databankform.get('value')?.value || '0.00'),
      loose: this.databankform.get('loose')?.value || '',
      state: this.databankform.get('state')?.value || true,
    };
    this.service.Update(dataToSave).subscribe(res => {
      this.closepopup();
    });
  }

  removeData(){
    const idValue = this.databankform.get('id')?.value;
    const _id = idValue ? parseInt(idValue, 10) : 0;
    this.service.Cancel(idValue).subscribe(res => {
      this.closepopup();
    });
  }

}
