import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/generic-response';
import { StudentDto } from '../models/student-dto';
import { BrokerService } from './broker.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private controller: string = 'Student';

  constructor(private broker: BrokerService) { }

  save(student: StudentDto): Observable<GenericResponse<number>> {
    return this.broker.post<number>(this.controller, 'Save', student);
  }

  get(student: StudentDto): Observable<GenericResponse<StudentDto[]>> {
    return this.broker.get<StudentDto[]>(this.controller, 'Get', student);
  }

  getAll(): Observable<GenericResponse<StudentDto[]>> {
    return this.broker.get<StudentDto[]>(this.controller, 'GetAll', null);
  }

  update(student: StudentDto): Observable<GenericResponse<boolean>> {
    return this.broker.put<boolean>(this.controller, 'Update', student);
  }

  delete(id: number): Observable<GenericResponse<boolean>> {
    return this.broker.delete<boolean>(this.controller, 'Delete', id);
  }
}
