import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopEmpTaskComponent } from './pop-emp-task.component';

describe('PopEmpTaskComponent', () => {
  let component: PopEmpTaskComponent;
  let fixture: ComponentFixture<PopEmpTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopEmpTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopEmpTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
