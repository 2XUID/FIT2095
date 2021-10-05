import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmoviesComponent } from './listmovies.component';

describe('ListmoviesComponent', () => {
  let component: ListmoviesComponent;
  let fixture: ComponentFixture<ListmoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
