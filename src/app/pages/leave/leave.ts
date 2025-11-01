import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { DatePipe, CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './leave.html',
  styleUrl: './leave.css',
})
export class Leave implements OnInit {

  employeeService = inject(EmployeeService);
  @ViewChild('newModel') newModel!: ElementRef;
  modalInstance: any;

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  leaveList: any[] = [];

  constructor() {
    const loggedData = localStorage.getItem('leaveUser');
    if (loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId);
    }
  }

  ngOnInit(): void {
    this.loadLeaves();
  }

  
  openModel() {
    this.modalInstance = new bootstrap.Modal(this.newModel.nativeElement);
    this.leaveForm.reset({
      leaveId: 0,
      employeeId: this.leaveForm.controls['employeeId'].value,
      isApproved: false,
      approvedDate: null,
    });
    this.modalInstance.show();
  }

  closeModel() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

 
  loadLeaves() {
    const empId = this.leaveForm.controls['employeeId'].value;

    if (!empId) return;

    this.employeeService.getAllLeaveByEmpId(empId).subscribe({
      next: (result: any) => {
        this.leaveList = result.data || [];
      },
      error: (err) => {
        console.error('Error loading leaves:', err);
      },
    });
  }

 
  onSave() {
  const formValue = this.leaveForm.value;
  this.employeeService.onAddLeave(formValue).subscribe({
    next: (res: any) => {
      if (res.result) {
        alert('Leave request created successfully!');
        this.closeModel();
        this.loadLeaves(); 
      } else {
        alert(res.message || 'Failed to add leave');
      }
    },
    error: (err) => {
      console.error('Error while saving leave:', err);
      alert('Something went wrong while adding leave');
    },
  });
}

}
