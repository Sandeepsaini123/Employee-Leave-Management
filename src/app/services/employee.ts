import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIresponseModel } from '../model/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http:HttpClient){}

  onLogin(obj:any){
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login",obj)
  }
  
  getAllEmployees():Observable<APIresponseModel>{
    return this.http.get<APIresponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees");
  }

  // onSaveEmployee(obj:any){
  //   return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee",obj)
  // }
}
