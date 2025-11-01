import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getDepartment(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments").pipe(
      map((res:any)=>res.data)
    );
  }

  getRole(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles").pipe(
      map((res:any)=>res.data)
    );
  }

  onSaveEmployee(obj:any){
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee",obj)
  }

  onAddLeave(obj:any){
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave",obj)
  }

   getAllLeaveByEmpId(empId:number):Observable<APIresponseModel>{
    return this.http.get<APIresponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees"+empId);
  }


}
