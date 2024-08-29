import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Commande} from "../model/Commande";
import {CommandeService} from "../services/commandeService/commande.service";
import {TagModule} from "primeng/tag";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CommandeItemsComponent} from "../commande-history/commande-items/commande-items.component";
import {NgIf} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {DataSource} from "@angular/cdk/collections";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-commande-list',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        TagModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        CommandeItemsComponent,
        NgIf,
        SkeletonModule,
        TableModule,
        MatSlideToggle
    ],
  templateUrl: './commande-list.component.html',
  styleUrl: './commande-list.component.css'
})
export class CommandeListComponent implements OnInit{
  columnsToDisplay = ['id', 'personnel','dateCommande','montantTotal','status','dateLivraison'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Commande | null | undefined;
  dataSource!: MatTableDataSource<Commande>;
  currentDay = new Date();
  dataSourceLoading! : DataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commandeService: CommandeService,
              public keycloakService: KeycloakService) {
  }
  ngOnInit() {
    this.dataSourceLoading = new MatTableDataSource(
        Array.from({ length:8 }, () => ({
          id: '',
          personnel: '',
          dateCommande: '',
          dateLivraison: '',
          montantTotal: '',
          status: ''
        }))
    );
    this.getCommande();
  }

  getCommande(){
    this.commandeService.getCommande().subscribe((commandeList)=> {
      this.dataSource = new MatTableDataSource(commandeList.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Commande, filter: string) => {
        const dataStr = data.commandeDetailDto.id + data.personnelDto.firstName +  data.personnelDto.lastName + data.commandeDetailDto.dateCommande + data.commandeDetailDto.dateLivraison + data.commandeDetailDto.montantTotal;
        return dataStr.toLowerCase().includes(filter);
      };
    })
  }
  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource!.filter)
    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }
  applyDateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Commande, filter: string) => {
       const dateLivraison = data.commandeDetailDto.dateLivraison;
       return dateLivraison.includes(filter);
    };
  }
  isToday(date : String): boolean {
    let formatedCurrentDay = this.currentDay.getDate().toString().padStart(2, '0') + "/" +
        (this.currentDay.getMonth() + 1).toString().padStart(2, '0') + "/" +
        this.currentDay.getFullYear().toString();
    return date === formatedCurrentDay;
  }
  isDateValidBeforeOrderCutoff(date: string) {
    const currentDay = new Date();
    currentDay.setHours(0,0,0,0)
    return (this.isToday(date) && this.currentDay.getHours() >= 11)
  }
  toggleTraitement(event: MatSlideToggleChange, commandeId: number) {
     const commande = this.dataSource.data.find(cmd => cmd.commandeDetailDto.id === commandeId);
     this.commandeService.updateTraitement(commandeId,event.checked).subscribe(() =>
         commande!.commandeDetailDto.traitement=event.checked
     );
  }

}
