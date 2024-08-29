import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-accueil-template',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './accueil-template.component.html',
  styleUrl: './accueil-template.component.css'
})
export class AccueilTemplateComponent implements OnInit {
  public profile! : KeycloakProfile;
  constructor(public keycloakService: KeycloakService){
  }

  ngOnInit() {
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
  }
  async handleLogin(){
    await this.keycloakService.login({
      redirectUri: window.location.origin
    })
  }
  handleLogout(){
    this.keycloakService.logout(window.location.origin)
  }

}
