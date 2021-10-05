import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateactorComponent } from './updateactor.component';

describe('UpdateactorComponent', () => {
  let component: UpdateactorComponent;
  let fixture: ComponentFixture<UpdateactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
