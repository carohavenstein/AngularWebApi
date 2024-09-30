import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      if(employeeId)
      this.editEmployee(employeeId);
    });
  }

  async addEmployee(employee: Employee) {

    if (employee.name == "") {
      this.toastr.error('El nombre del empleado no puede estar vacio');
      return;
    }

    if (employee.name.length > 100) {
      this.toastr.error('El nombre del empleado no puede tener mas de 100 caracteres');
      return;
    }

    if (employee.name.length < 2) {
      this.toastr.error('El nombre del empleado no puede tener menos de 2 caracteres');
      return;
    }

    const regex = /\d/;
    if (regex.test(employee.name)) {
      this.toastr.error('El nombre del empleado no puede tener numeros');
    }

    employee.createdDate = new Date().toISOString();
    if (employee.id == 0) {
      await this.employeeService.createEmployee(employee).toPromise();
    } else {
      await this.employeeService.updateEmployee(employee).toPromise();
    }
    //this.employeeService.updateEmployee(employee).subscribe(result=> {this.router.navigate(['/']);});
    
    //this.submitBtnText = "";
    //this.imgLoadingDisplay = 'inline';
  }

  editEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(res => {
      this.newEmployee.id = res.id;
      this.newEmployee.name = res.name
      this.submitBtnText = "Edit";
    });
  }

}
