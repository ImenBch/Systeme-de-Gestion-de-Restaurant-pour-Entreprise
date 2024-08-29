import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeItemCardComponent } from './commande-item-card.component';

describe('CommandeItemCardComponent', () => {
  let component: CommandeItemCardComponent;
  let fixture: ComponentFixture<CommandeItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
