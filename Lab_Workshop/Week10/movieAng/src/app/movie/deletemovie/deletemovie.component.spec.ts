import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemovieComponent } from './deletemovie.component';

describe('DeletemovieComponent', () => {
  let component: DeletemovieComponent;
  let fixture: ComponentFixture<DeletemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletemovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
