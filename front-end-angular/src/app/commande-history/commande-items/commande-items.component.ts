import {Component, Input, OnInit} from '@angular/core';
import {ArticleDeCommande} from "../../model/ArticleDeCommande";
import {MatTableModule} from "@angular/material/table";
import {Commande} from "../../model/Commande";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-commande-items',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon
  ],
  templateUrl: './commande-items.component.html',
  styleUrl: './commande-items.component.css'
})
export class CommandeItemsComponent implements OnInit{
  @Input() commande!: Commande;
  commandeItemList!: ArticleDeCommande[]
  displayedColumns: string[] = ['nom', 'prix'];

  ngOnInit(){
    this.commandeItemList= this.commande.articleDeCommandeDtos;
  }

}
