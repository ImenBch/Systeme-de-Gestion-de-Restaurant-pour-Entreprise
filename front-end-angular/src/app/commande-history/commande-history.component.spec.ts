import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeHistoryComponent } from './commande-history.component';

describe('CommandeHistoryComponent', () => {
  let component: CommandeHistoryComponent;
  let fixture: ComponentFixture<CommandeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
