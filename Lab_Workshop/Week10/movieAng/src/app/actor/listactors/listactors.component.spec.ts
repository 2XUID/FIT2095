import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListactorsComponent } from './listactors.component';

describe('ListactorsComponent', () => {
  let component: ListactorsComponent;
  let fixture: ComponentFixture<ListactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListactorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
