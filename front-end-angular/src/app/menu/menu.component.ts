import {Component, ViewChild} from '@angular/core';
import {MostEvaluatedMenuComponent} from "./most-evaluated-menu/most-evaluated-menu.component";
import {MenuCardComponent} from "./menu-items/menu-card.component";

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [
        MostEvaluatedMenuComponent,
        MenuCardComponent
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    @ViewChild('menuCard') menuCard!: MenuCardComponent;

    handleCommande(event: {id: number; quantity: number}) {
        if(this.menuCard){
            this.menuCard.handleSlideBarCommande(event);
        }
    }

}
