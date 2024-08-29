import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {Menu} from "../../model/Menu";
import {KeycloakService} from "keycloak-angular";
import {FormsModule} from "@angular/forms";
import {MenuService} from "../../services/menuService/menu-service";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../dialogs/delete-popup/delete-popup.component";
import {MenuItemDialogComponent} from "../menu-item-dialog/menu-item-dialog.component";
import {MenuItemDetailComponent} from "../menu-item-detail/menu-item-detail.component";
import {NgIf} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-menu-item-card',
  standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatCardModule,
        RatingModule,
        MatSlideToggle,
        FormsModule,
        NgIf,
        TagModule
    ],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.css'
})
export class MenuItemCardComponent {
  @Input() menuItem!: Menu;
  @Output() itemDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() slideBarCommande : EventEmitter<{ id: number, quantity: number }> = new EventEmitter<{ id: number, quantity: number }>();

  constructor(public keycloakService : KeycloakService,
              private menuService : MenuService,
              public matDialog : MatDialog) {
  }

  toggleDisponibiliteMenuItem(event: MatSlideToggleChange) {
    this.menuItem.disponibilite=event.checked;
    this.menuService.updateDisponibilite(this.menuItem.id,this.menuItem.disponibilite).subscribe();
  }
  updateDisponibiliteMsg() {
    return  this.menuItem.disponibilite ? 'Disponible!' : 'Non disponible!';
  }
  updateTagSeverity() {
      return  this.menuItem.disponibilite ? "success" : "danger";
  }
  addEvaluationMenuItem() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    if (keycloakInstance.authenticated) {
      const userId = keycloakInstance.tokenParsed?.sub;
      if (userId) {
        this.menuService.addEvaluation(this.menuItem.id,userId,this.menuItem.evaluation).subscribe(
            (updatedMenuItem: Menu) => {
              this.menuItem.serverEvaluation=updatedMenuItem.evaluation;
            }
        )
      }
    }
  }
  deleteMenuItem() {
    this.menuService.deleteMenuItem(this.menuItem.id).subscribe(()=>
        this.itemDeleted.emit(this.menuItem.id)
    )
  }
  openDeleteDialog(){
    const dialogRef = this.matDialog.open(DeletePopupComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deleteMenuItem();
      }
    })
  }
  openUpdateDialog(){
    const dialogRef= this.matDialog.open(MenuItemDialogComponent, {data : this.menuItem});
    dialogRef.afterClosed().subscribe(updatedItem => {
      if (updatedItem) {
        this.menuItem= updatedItem;
      }
    })
  }
  async openDetailDialog() {
    if (!this.keycloakService.getUserRoles().includes('admin')){
      if(this.keycloakService.isLoggedIn()){
          const matDialogRef = this.matDialog.open(MenuItemDetailComponent,{
              data: this.menuItem,
              maxWidth:'690px',
              minWidth:'500px',
              maxHeight:'100%'
          })
          matDialogRef.afterClosed().subscribe((quantity:number) => {
                  if (quantity) {
                      this.slideBarCommande.emit({id: this.menuItem.id, quantity:quantity})
                  }
          })
      }else{
          await this.keycloakService.login({
              redirectUri: window.location.origin
          })
      }
    }
  }

}
