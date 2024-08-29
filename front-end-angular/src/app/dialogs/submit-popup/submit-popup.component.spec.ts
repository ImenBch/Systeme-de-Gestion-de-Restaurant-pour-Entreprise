import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPopupComponent } from './submit-popup.component';

describe('SubmitPopupComponent', () => {
  let component: SubmitPopupComponent;
  let fixture: ComponentFixture<SubmitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
