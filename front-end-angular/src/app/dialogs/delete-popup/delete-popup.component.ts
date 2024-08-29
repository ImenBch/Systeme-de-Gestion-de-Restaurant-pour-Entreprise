import {Component} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton
  ],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {}
