import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCheckoutComponent } from './result-checkout.component';

describe('ResultCheckoutComponent', () => {
  let component: ResultCheckoutComponent;
  let fixture: ComponentFixture<ResultCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
