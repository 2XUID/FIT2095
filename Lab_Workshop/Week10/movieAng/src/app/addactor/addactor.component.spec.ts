import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactorComponent } from './addactor.component';

describe('AddactorComponent', () => {
  let component: AddactorComponent;
  let fixture: ComponentFixture<AddactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
