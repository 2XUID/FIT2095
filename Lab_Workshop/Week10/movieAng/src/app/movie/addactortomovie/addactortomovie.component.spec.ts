import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactortomovieComponent } from './addactortomovie.component';

describe('AddactortomovieComponent', () => {
  let component: AddactortomovieComponent;
  let fixture: ComponentFixture<AddactortomovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddactortomovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactortomovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
