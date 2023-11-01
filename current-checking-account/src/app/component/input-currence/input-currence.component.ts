
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';


@Component({
  selector: 'app-input-currence',
  templateUrl: './input-currence.component.html',
  styleUrls: ['./input-currence.component.css']
})

export class InputCurrenceComponent {

  currencyInputMask = createMask({
    alias: 'decimal',
    groupSeparator: '.',
    digits: 2,
    digitsOptional: false,
    prefix: 'R$',
    placeholder: '0.00,00',
  });

  value = new FormControl('');
}
