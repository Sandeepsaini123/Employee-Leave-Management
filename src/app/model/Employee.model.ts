export class LoginModel {
    emailId:string;
    password:string;

    constructor(){
        this.emailId='';
        this.password='';
    }
}
export interface APIresponseModel{
    message:string;
    result:boolean;
    data:any;
}

export interface EmployeeList{
     "employeeId": number;
      "employeeName": string;
      "deptId": number;
      "deptName": string;
      "contactNo": string;
      "emailId": string;
      "role": string;
}

export class EmployeeModel {
  employeeId: number
  employeeName: string
  contactNo: string
  emailId: string
  deptId: number
  password: string
  gender: string
  role: string

  constructor(){
    this.employeeId=0;
    this.emailId='';
    this.employeeName='';
    this.contactNo='';
    this.deptId=0;
    this.password='';
    this.gender='';
    this.role='';
  }
}
