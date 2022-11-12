import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentDto } from 'src/app/models/student-dto';
import { StudentService } from 'src/app/services/student.service';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import { Validator } from 'src/app/utils/validator';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Output() selectStudent = new EventEmitter<StudentDto>();

  students: StudentDto[] = [];
  studentForm!: FormGroup;

  constructor(private builder: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {
    this.initForm();
    this.getStudents();
  }

  initForm() {
    this.studentForm = this.builder.group({
      userName: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  getStudents() {
    this.studentService.getAll().subscribe(r => {
      this.students = r.result!;
    });
  }

  editStudent(student: StudentDto) {
    this.selectStudent.emit(student);
  }

  deleteStudent(id: number) {
    SweetAlert.showYesNo("Do you want to delete this student?").then(v => {
      if (v.isConfirmed) {
        this.studentService.delete(id).subscribe(r => {
          SweetAlert.showSuccess(r.message);
          this.getStudents();
        });
      }
    });
  }

  submit() {
    const student = this.studentForm.value as StudentDto;
    this.studentService.get(student).subscribe(r => {
      this.students = r.result!;
    });
  }

  validateLetters(e: KeyboardEvent): boolean {
    return Validator.validateLetters(e);
  }
}
