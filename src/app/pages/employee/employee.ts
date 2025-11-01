import { Component, ElementRef, OnInit ,ViewChild,inject} from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { APIresponseModel,EmployeeList, EmployeeModel } from '../../model/Employee.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe,FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employeeService = inject(EmployeeService);
  employeeList:EmployeeList[]=[];

  @ViewChild("newModel") newModel!:ElementRef;

  employeeObj:EmployeeModel=new EmployeeModel();

  deptList$:Observable<any []>=new Observable<any[]>;
  roleList$:Observable<any []>=new Observable<any[]>;

  ngOnInit(): void {
    this.getEmployees();
    this.deptList$=this.employeeService.getDepartment();
    this.roleList$=this.employeeService.getRole();  
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

  onSaveEmployee(){
    this.employeeObj.deptId = Number(this.employeeObj.deptId);
    this.employeeService.onSaveEmployee(this.employeeObj).subscribe({
      next:(res:any)=>{
        if(res.result){
          this.getEmployees();
          alert("Employee Created Successfully");
        }
        else{
          alert(res.message);
        }
          
      },
      error:()=>{

      }
    })
  }

}
