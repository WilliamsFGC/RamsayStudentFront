import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {

  @Input() control!: FormControl | AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

}
