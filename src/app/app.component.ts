import { Component } from '@angular/core';
import { StudentDto } from './models/student-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Student';
  showStudent: boolean = true;
  showFind: boolean = false;
  student: StudentDto | null = null;

  showButtons(isSave: boolean = true) {
    this.showFind = !isSave;
    this.showStudent = isSave;
  }

  selectedStudent(student: StudentDto) {
    this.student = student;
    this.showButtons();
  }

  studentUpdated() {
    this.showButtons(false);
  }
}
