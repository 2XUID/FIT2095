import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdpateactorComponent } from './udpateactor.component';

describe('UdpateactorComponent', () => {
  let component: UdpateactorComponent;
  let fixture: ComponentFixture<UdpateactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdpateactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdpateactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
