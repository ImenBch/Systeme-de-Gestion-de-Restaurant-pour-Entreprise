import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../../model/Menu";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url= environment.backendHost;
  constructor(private http: HttpClient) { }

  // Get article de menu
  public getAllArticleMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.url}/menu`);
  }
  // Get most evaluated article
  public getMostEvaluated():Observable<Menu>{
    return this.http.get<Menu>(`${this.url}/menu/mostEvaluatedArticle`)
  }
  // Update disponibilite
  public updateDisponibilite(id:number, disponibilite: boolean):Observable<Menu>{
      return this.http.patch<Menu>(`${this.url}/menu/restaurantstaff/${id}/disponibilite?nouvelleDisponibilite=${disponibilite}`,{})
  }
  // add Evaluation
  public addEvaluation(id:number, userId:String,evaluation: number): Observable<Menu>{
    return this.http.patch<Menu>(`${this.url}/menu/user/${id}/addEvaluation?userId=${userId}&nouvelleEvaluation=${evaluation}`,{})
  }
  // post MenuItem
  public postMenuItem(formData:any){
    return this.http.post<Menu>(`${this.url}/menu/admin`,formData)
  }
  // Delete MenuItem
  public deleteMenuItem(id: number){
    return this.http.delete(`${this.url}/menu/admin/${id}`)
  }
  // Update MenuItem
  public updateMenuItem(id: number,formData: any){
    return this.http.put<Menu>(`${this.url}/menu/admin/${id}`,formData)
  }

}
