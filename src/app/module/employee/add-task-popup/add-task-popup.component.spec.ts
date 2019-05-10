import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPopupComponent } from './add-task-popup.component';

describe('AddTaskPopupComponent', () => {
  let component: AddTaskPopupComponent;
  let fixture: ComponentFixture<AddTaskPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
