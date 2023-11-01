import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCurrenceComponent } from './input-currence.component';

describe('InputCurrenceComponent', () => {
  let component: InputCurrenceComponent;
  let fixture: ComponentFixture<InputCurrenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputCurrenceComponent]
    });
    fixture = TestBed.createComponent(InputCurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
