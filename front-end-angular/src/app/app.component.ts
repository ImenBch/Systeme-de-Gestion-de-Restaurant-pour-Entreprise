import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AccueilTemplateComponent} from "./accueil-template/accueil-template.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AccueilTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end-angular';

}
