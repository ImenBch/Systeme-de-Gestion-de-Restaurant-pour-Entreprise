import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commande} from "../../model/Commande";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private url= environment.backendHost;
  constructor(private http: HttpClient) { }

  // post commande
  public postCommande(commande:any){
    return this.http.post<Commande>(`${this.url}/commandes/user-restaurantstaff`,commande)
  }
  // get commande by user id
  public getCommandeByUserId(userId: string ){
    return this.http.get<Commande[]>(`${this.url}/commandes/personnel/${userId}`,{})
  }
  // delete commande
  public deleteCommande(commandeId: number){
    return this.http.delete(`${this.url}/commandes/user-restaurantstaff/${commandeId}`,{})
  }
  // get All commande
  public getCommande(){
    return this.http.get<Commande[]>(`${this.url}/commandes/admin-restaurantstaff`,{})
  }
  public updateTraitement(commandeId: number, traitement: boolean){
    return this.http.patch<Commande>(`${this.url}/commandes/restaurantstaff/${commandeId}?traitement=${traitement}`,{})
  }

}
