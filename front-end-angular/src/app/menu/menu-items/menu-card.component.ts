import { Component, OnInit, ViewChild} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MenuService} from "../../services/menuService/menu-service";
import {Menu} from "../../model/Menu"
import {NgIf} from "@angular/common";
import {KeycloakService} from "keycloak-angular";
import {MatIcon} from "@angular/material/icon";
import {MenuItemCardComponent} from "../menu-item-card/menu-item-card.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuItemDialogComponent} from "../menu-item-dialog/menu-item-dialog.component";
import {SidebarModule} from "primeng/sidebar";
import {CommandeComponent} from "../../commande/commande.component";

@Component({
  selector: 'app-menu-card',
  standalone: true,
    imports: [
        NgIf,
        MatIcon,
        MatFabButton,
        MenuItemCardComponent,
        SidebarModule,
        CommandeComponent
    ],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent implements OnInit{
  menu!: Menu[]
  sidebarVisible= false;
  commandeItems:Menu[] = [];
  profileName!: String;
  @ViewChild(CommandeComponent) commandeComponent!: CommandeComponent;

  constructor(private menuService: MenuService,
              public keyCloakService: KeycloakService,
              public matDialog : MatDialog,
              ) {
      keyCloakService.loadUserProfile().then(profile => {
          this.profileName= profile.firstName + " " + profile.lastName;
      })
  }
  ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    this.menuService.getAllArticleMenu().subscribe((data)=> {
      this.menu=data.map(menuItem => ({...menuItem, serverEvaluation:menuItem.evaluation}));
    })
  }
  removeItem(itemId: number) {
    this.menu = this.menu.filter(item => item.id !== itemId);
  }
  openAddDialog() {
    const dialogRef= this.matDialog.open(MenuItemDialogComponent);
    dialogRef.afterClosed().subscribe(addedManuItem => {
            if(addedManuItem){
                this.menu.push(addedManuItem);
            }
    })
  }
  handleSlideBarCommande(event: { id: number, quantity: number }) {
      const menuItem = this.menu.find(menuItem => menuItem.id===event.id)!;
      const commandeItem = this.commandeItems.find(commandeItem => commandeItem.id === event.id);
      if(commandeItem){
        commandeItem.quantity!+=event.quantity;
      }
      else{
        const commandeItem = {
          ...menuItem,
          quantity: event.quantity
        }
        this.commandeItems.push(commandeItem);
      }
      if (this.commandeComponent) {
          this.commandeComponent.activeStep = 0;
      }
      this.sidebarVisible = true;
  }
  handleSidebarVisible(event: boolean) {
      console.log("test")
    this.sidebarVisible= event;
  }

}
