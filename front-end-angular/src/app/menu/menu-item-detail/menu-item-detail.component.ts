import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {Menu} from "../../model/Menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu-item-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatCardModule,
    MatIconButton,
    RatingModule,
    FormsModule,
    MatDialogClose
  ],
  templateUrl: './menu-item-detail.component.html',
  styleUrl: './menu-item-detail.component.css'
})
export class MenuItemDetailComponent {
  quantity!:number;
  constructor(public matDialogRef: MatDialogRef<MenuItemDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public menuItem?: Menu) {
    this.quantity = menuItem?.quantity ? menuItem.quantity : 1;
  }

  decQuantity() {
    this.quantity--
  }
  incQuantity() {
    this.quantity++
  }
  async handleCommande(){
    this.matDialogRef.close(this.quantity)
  }

}
