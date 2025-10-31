import { Component, ElementRef, OnInit ,ViewChild,inject} from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { APIresponseModel,EmployeeList } from '../../model/Employee.model';
declare var bootstrap: any;

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employeeService = inject(EmployeeService);
  employeeList:EmployeeList[]=[];

  @ViewChild("newModel") newModel!:ElementRef;

  ngOnInit(): void {
    this.getEmployees();  
  }

  getEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next:(response:APIresponseModel)=>{
       this.employeeList=response.data;
      },
      error:()=>{

      }
    })
  }

  openModel(){
    const modal = new bootstrap.Modal(this.newModel.nativeElement);
    modal.show();
  }
  
  closeModel(){
    const modal = bootstrap.Modal.getInstance(this.newModel.nativeElement);
    modal.hide();
  }

  // onSaveEmployee(){
  //   this.employeeService.onSaveEmployee(this.)
  // }

}
