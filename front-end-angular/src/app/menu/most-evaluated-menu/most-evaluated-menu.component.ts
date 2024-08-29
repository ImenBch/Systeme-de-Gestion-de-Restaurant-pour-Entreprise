import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {Menu} from "../../model/Menu";
import {MenuService} from "../../services/menuService/menu-service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {KeycloakService} from "keycloak-angular";
import {MenuItemDetailComponent} from "../menu-item-detail/menu-item-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {SkeletonModule} from "primeng/skeleton";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-most-evaluated-menu',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    RatingModule,
    FormsModule,
    NgIf,
    SkeletonModule,
    TagModule
  ],
  templateUrl: './most-evaluated-menu.component.html',
  styleUrl: './most-evaluated-menu.component.css'
})
export class MostEvaluatedMenuComponent implements OnInit{
  public mostEvaluatedMenu!:Menu;
  public disponibiliteMsg!: string;
  tagSeverity: "success" | "danger" | undefined;
  @Output() onCommande : EventEmitter<{ id: number, quantity: number }> = new EventEmitter<{ id: number, quantity: number }>();

  constructor(private menuService: MenuService,
              public keycloakService: KeycloakService,
              public matDialog : MatDialog) {
  }
  ngOnInit(): void {
    setTimeout(()=>
        this.menuService.getMostEvaluated().subscribe(
            (data: Menu) => {
              this.mostEvaluatedMenu = data;
              this.disponibiliteMsg = this.mostEvaluatedMenu.disponibilite ? 'Disponible!' : 'Non disponible!';
              this.tagSeverity = this.mostEvaluatedMenu.disponibilite ? "success" : "danger" ;
            }
        ),500)
  }

  async openDetailDialog() {
      if (!this.keycloakService.getUserRoles().includes('admin')){
          if(this.keycloakService.isLoggedIn()){
              const matDialogRef = this.matDialog.open(MenuItemDetailComponent, {
                  data: this.mostEvaluatedMenu,
                  maxWidth:'690px',
                  minWidth:'500px',
                  maxHeight:'100%'
              })
              matDialogRef.afterClosed().subscribe((quantity:number) => {
                      if (quantity) {
                          this.onCommande.emit({id: this.mostEvaluatedMenu.id, quantity: quantity})
                      }
                  }
              )
          }else{
              await this.keycloakService.login({
                  redirectUri: window.location.origin
              })
          }
      }
  }

}
