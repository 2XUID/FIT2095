import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteactorComponent } from './deleteactor.component';

describe('DeleteactorComponent', () => {
  let component: DeleteactorComponent;
  let fixture: ComponentFixture<DeleteactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
