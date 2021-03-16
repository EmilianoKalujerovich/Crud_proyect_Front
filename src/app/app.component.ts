import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: any;

  constructor(
    public fb: FormBuilder,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', Validators.required],
      commissionPct: ['', Validators.required],
    });

    this.employeeService.getAllEmployee().subscribe(
      (resp) => {
        this.employee = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.employeeService.saveEmployee(this.employeeForm.value).subscribe(
      (resp) => {
        this.employeeForm.reset();
        this.employee=this.employee.filter(employee=> resp.id!==employee.id);
        this.employee.push(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(employee){
    this.employeeService.deleteEmployee(employee.id).subscribe(resp=>{
      console.log(resp);
      if(resp===true){
        this.employee.pop(employee)
      }
    })
  }

  editar(employee){
    this.employeeForm.setValue({
      id:employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate:employee.hireDate,
      salary: employee.salary,
      commissionPct: employee.commissionPct,
    })
  }


}
