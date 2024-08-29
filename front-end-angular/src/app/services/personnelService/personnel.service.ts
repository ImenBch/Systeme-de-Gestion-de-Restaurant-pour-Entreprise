import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Commande} from "../../model/Commande";

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private url= environment.backendHost;
  constructor(private http: HttpClient) { }

  // get liste des commandes
  public getCommandeListByUserlId(userId: String){
    return this.http.get<Commande[]>(`${this.url}/users/${userId}/commandes`,{})
  }

}
