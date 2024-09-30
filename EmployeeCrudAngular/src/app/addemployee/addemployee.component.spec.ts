import { TestBed } from '@angular/core/testing';
import { AddemployeeComponent } from './addemployee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // para simular observables
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

describe('AddemployeeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddemployeeComponent, HttpClientTestingModule],
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute, // Simula ActivatedRoute
          useValue: {
            params: of({ id: 1 }) // simula el parámetro id en la URL
          }
        },
        {
          provide: ToastrService, // Proporciona un mock de ToastrService
          useValue: {
            error: (msg: string) => console.log('Toastr error:', msg)
          }
        }
      ]
    });
  });
  
  it('should create', () => {
    const fixture = TestBed.createComponent(AddemployeeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  /*
  it('should display error if name is less than 2 charactes', () => {
    const fixture = TestBed.createComponent(AddemployeeComponent);
    const component = fixture.componentInstance;
    const toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    
    component.newEmployee.name = 'A A';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre del empleado no puede tener menos de 2 caracteres');
  });
  */
  
});
