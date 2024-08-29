import {
    Component,
    EventEmitter,
    Input, OnInit,
    Output,
} from '@angular/core';
import {Menu} from "../model/Menu";
import {MatListModule} from "@angular/material/list";
import {CommandeItemCardComponent} from "./commande-item-card/commande-item-card.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuItemDetailComponent} from "../menu/menu-item-detail/menu-item-detail.component";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {StepperModule} from "primeng/stepper";
import {FormsModule} from "@angular/forms";
import {CommandeService} from "../services/commandeService/commande.service";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js"
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {DateAdapter, provideNativeDateAdapter} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-commande',
  standalone: true,
    imports: [
        MatListModule,
        CommandeItemCardComponent,
        MatButton,
        NgIf,
        StepperModule,
        FormsModule,
        MatIcon,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule
    ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css',
  providers: [provideNativeDateAdapter()]
})
export class CommandeComponent implements OnInit{
  @Input() commandeItems!: Menu[];
  @Output() commandeItemsChange: EventEmitter<Menu[]> = new EventEmitter<Menu[]>();
  @Output() slideBarStat: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeStep=0;
  profile! : KeycloakProfile;
  commentaire!:string;
  selectedDate!: Date;

  constructor(
      private matDialog: MatDialog,
      private commandeService: CommandeService,
      public keycloakService: KeycloakService,
      private _snackBar: MatSnackBar,
      private _adapter: DateAdapter<any>) {
  }
  ngOnInit() {
      if (this.keycloakService.isLoggedIn()) {
          this.keycloakService.loadUserProfile().then(profile => {
                this.profile = profile;
          });
      }
      this._adapter.setLocale('fr');
  }

  // date
  public minDate!:Date ;
  public maxDate!: Date ;
  onActiveStepChange($event: number) {
    if($event ===1){
         this.minDate = this.calculateMinDate();
         this.maxDate = this.calculateMaxDate(this.minDate);
    }
  }
  dateFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      return day !== 0 && day !== 6;
  };
  private calculateMinDate(): Date {
      const minDate = new Date();
      if (minDate.getHours() >= 11) {
          minDate.setDate(minDate.getDate() + 1)
      }
      return minDate;
  }
  // maxDate ne dépasser 3 jours ouvrables à partir du minDate
  private calculateMaxDate(date: Date): Date {
      let daysToAdd=3;
      if (date!== new Date()) {
          daysToAdd = 2
      }
      let maxDate = new Date(date);
      while (daysToAdd > 0) {
          maxDate.setDate(maxDate.getDate() + 1);
          const dayOfWeek = maxDate.getDay();
          // les jours de week-end sont ignorés
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              daysToAdd--;
          }
      }
      return maxDate;
  }
  getFormatedSelectedDate(){
          return this.selectedDate.getDate().toString().padStart(2, '0') + "/" +
              (this.selectedDate.getMonth() + 1).toString().padStart(2, '0') + "/" +
              this.selectedDate.getFullYear().toString();
  }
  removeCommandeItem(event: number){
   this.commandeItems= this.commandeItems.filter(commandeItem => commandeItem.id !== event);
   this.commandeItemsChange.emit(this.commandeItems);
  }
  updateCommandeItem(event:Menu){
    this.slideBarStat.emit(false)
    const matDialogRef= this.matDialog.open(MenuItemDetailComponent, {
      data: event,
      maxWidth:'690px',
      minWidth:'500px',
      maxHeight:'100%'
    })
    matDialogRef.afterClosed().subscribe( (data: number) => {
      if(data){
        event.quantity=data;
      }
      this.slideBarStat.emit(true)
    })
  }
  get total():number{
      return this.commandeItems
          .map( commandeItem => commandeItem.quantity! * commandeItem.prix)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  postCommande(){
      const commandeItemList= this.commandeItems.map(commandeItem => ({menuId: commandeItem.id, quantite: commandeItem.quantity}))
      const commande = {
          dateLivraison: this.getFormatedSelectedDate(),
          commentaire: this.commentaire,
          personnelId: this.profile.id,
          articleDeCommandeList: commandeItemList
      }
      this.commandeService.postCommande(commande).subscribe(() => {
          this.commandeItemsChange.emit([]);
          this.slideBarStat.emit(false);
          this._snackBar.open("Commande enregistrée!","OK",{
              horizontalPosition: "left",
              verticalPosition: "bottom",
          })
      })
  }

}
