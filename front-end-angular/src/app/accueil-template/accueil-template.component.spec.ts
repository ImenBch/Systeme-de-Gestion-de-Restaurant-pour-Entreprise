import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilTemplateComponent } from './accueil-template.component';

describe('AccueilTemplateComponent', () => {
  let component: AccueilTemplateComponent;
  let fixture: ComponentFixture<AccueilTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccueilTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
