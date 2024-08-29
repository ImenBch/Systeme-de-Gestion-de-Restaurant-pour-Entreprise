import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import {InformativePopupData} from "../../model/InformativePopupData";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-submit-popup',
  standalone: true,
  imports: [MatDialogModule,
            MatButton,
            MatIcon,],
  templateUrl: './submit-popup.component.html',
  styleUrl: './submit-popup.component.css'
})
export class SubmitPopupComponent {
  constructor( public dialogRef: MatDialogRef<SubmitPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data: InformativePopupData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

}
