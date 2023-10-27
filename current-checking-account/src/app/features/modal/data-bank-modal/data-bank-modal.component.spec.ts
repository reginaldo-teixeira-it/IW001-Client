import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBankModalComponent } from './data-bank-modal.component';

describe('DataBankModalComponent', () => {
  let component: DataBankModalComponent;
  let fixture: ComponentFixture<DataBankModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataBankModalComponent]
    });
    fixture = TestBed.createComponent(DataBankModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
