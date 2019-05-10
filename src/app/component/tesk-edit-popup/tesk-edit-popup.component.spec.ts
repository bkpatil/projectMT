import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeskEditPopupComponent } from './tesk-edit-popup.component';

describe('TeskEditPopupComponent', () => {
  let component: TeskEditPopupComponent;
  let fixture: ComponentFixture<TeskEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeskEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeskEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
