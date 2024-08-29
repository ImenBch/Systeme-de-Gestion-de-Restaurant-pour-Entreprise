import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeItemsComponent } from './commande-items.component';

describe('CommandeItemsComponent', () => {
  let component: CommandeItemsComponent;
  let fixture: ComponentFixture<CommandeItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
