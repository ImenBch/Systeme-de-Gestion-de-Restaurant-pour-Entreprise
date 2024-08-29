import {Routes} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {AuthGuard} from "./guards/auth.guard";
import {CommandeHistoryComponent} from "./commande-history/commande-history.component";
import {CommandeListComponent} from "./commande-list/commande-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {path:"", component:MenuComponent},
  {path:"commandes" ,component:CommandeHistoryComponent, canActivate:[AuthGuard],data:{roles:["user","restaurantStaff"]}},
  {path:"commandeList" ,component:CommandeListComponent, canActivate:[AuthGuard],data:{roles:["admin","restaurantStaff"]}},
  {path:"**", component:PageNotFoundComponent}
];
