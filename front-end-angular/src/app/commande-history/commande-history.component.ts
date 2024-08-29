import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../services/commandeService/commande.service";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js/dist/keycloak";
import {Commande} from "../model/Commande";
import {AccordionModule} from "primeng/accordion";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TagModule} from "primeng/tag";
import {CommandeItemsComponent} from "./commande-items/commande-items.component";
import {SkeletonModule} from "primeng/skeleton";
import {PersonnelService} from "../services/personnelService/personnel.service";

@Component({
  selector: 'app-commande-history',
  standalone: true,
  imports: [
    AccordionModule,
    NgForOf,
    NgIf,
    PaginatorModule,
    MatButton,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    MatIcon,
    TagModule,
    CommandeItemsComponent,
    SkeletonModule,
  ],
  templateUrl: './commande-history.component.html',
  styleUrl: './commande-history.component.css'
})
export class CommandeHistoryComponent implements OnInit{
  profile!: KeycloakProfile;
  commandeList!: Commande[];
  //paginator
  first: number = 0;
  rows: number = 6;
  paginatedItems: Commande[]= [];

  constructor(private commandeService: CommandeService,
              private personnelService: PersonnelService,
              public keycloakService: KeycloakService,
              private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(profile => {
        this.profile = profile;
        if (this.profile && this.profile.id) {
          setTimeout(()=> this.getCommande(), 1000);
        }
      });
    }
  }

  getCommande(){
    return this.personnelService.getCommandeListByUserlId(this.profile.id!).subscribe(data => {
          this.commandeList = data.reverse();
          this.updatePaginatedItems();
        })
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.updatePaginatedItems();
  }
  private updatePaginatedItems() {
      const startIndex = this.first;
      const endIndex = startIndex + this.rows;
      this.paginatedItems = this.commandeList.slice(startIndex, endIndex);
  }
  handleCancelCommande(commande : Commande) {
      this.commandeService.deleteCommande(commande.commandeDetailDto.id).subscribe(() => {
        this.commandeList=  this.commandeList.filter(item => item.commandeDetailDto.id !== commande.commandeDetailDto.id )
        this.updatePaginatedItems()
        this._snackBar.open("Commande Annulée!", "OK", {
          horizontalPosition: "left",
          verticalPosition: "bottom",
          duration: 1000
        })
      })
  }

}
