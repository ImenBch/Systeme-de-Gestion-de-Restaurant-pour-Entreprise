import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {Menu} from "../../model/Menu";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-commande-item-card',
  standalone: true,
  imports: [
    MatListModule,
    MatButton
  ],
  templateUrl: './commande-item-card.component.html',
  styleUrl: './commande-item-card.component.css'
})
export class CommandeItemCardComponent {
  @Input() commandeItem!: Menu;
  @Output() itemCanceled: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemUpdated : EventEmitter<Menu> = new EventEmitter<Menu>();

  getTotalPrix(){
    return this.commandeItem.prix * this.commandeItem.quantity!
  }
  handleEditCommandeItem() {
    this.itemUpdated.emit(this.commandeItem)
  }
  handleCancelCommandeItem() {
    this.itemCanceled.emit(this.commandeItem.id)
  }

}
