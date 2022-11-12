import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDto } from 'src/app/models/student-dto';
import { StudentService } from 'src/app/services/student.service';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import { Validator } from 'src/app/utils/validator'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: StudentDto | null = null;
  @Output() updated = new EventEmitter<void>();
  studentForm!: FormGroup;
  isInsert: boolean = false;

  constructor(private builder: FormBuilder, private studentService: StudentService) { }
  
  get f() {
    return this.studentForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.builder.group({
      id: [0],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      age: [0],
      career: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.setStudent();
  }

  setStudent() {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  submit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    const student = this.studentForm.value as StudentDto;
    if (student.id !== 0) {
      this.update(student);
    } else {
      this.save(student);
    }
  }

  update(student: StudentDto) {
    this.studentService.update(student).subscribe(r => {
      SweetAlert.showSuccess(r.message);
      if (!this.isInsert) {
        this.updated.emit();
      }
    });
  }

  save(student: StudentDto) {
    this.studentService.save(student).subscribe(r => {
      SweetAlert.showSuccess(r.message);
      this.studentForm.controls['id'].setValue(r.result);
      this.isInsert = true;
    });
  }

  validateLetters(e: KeyboardEvent): boolean {
    return Validator.validateLetters(e);
  }
}
