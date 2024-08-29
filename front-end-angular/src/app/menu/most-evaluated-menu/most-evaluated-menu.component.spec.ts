import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostEvaluatedMenuComponent } from './most-evaluated-menu.component';

describe('MostEvaluatedMenuComponent', () => {
  let component: MostEvaluatedMenuComponent;
  let fixture: ComponentFixture<MostEvaluatedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostEvaluatedMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostEvaluatedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
