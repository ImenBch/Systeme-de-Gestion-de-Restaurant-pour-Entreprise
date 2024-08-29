import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MenuService} from "../../services/menuService/menu-service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule, MatDialogRef,
} from "@angular/material/dialog";
import {Menu} from "../../model/Menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix
} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {SubmitPopupComponent} from "../../dialogs/submit-popup/submit-popup.component";

@Component({
  selector: 'app-menu-item-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogModule,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPrefix,
    NgIf,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './menu-item-dialog.component.html',
  styleUrl: './menu-item-dialog.component.css'
})
export class MenuItemDialogComponent implements OnInit{
  menuItemFormGroup!: FormGroup;
  isUpdateMode: boolean;
  constructor(private  fb: FormBuilder,
              private  menuService:MenuService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<MenuItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public menuItem?: Menu) {
    this.isUpdateMode= !!menuItem;
  }
  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.menuItemFormGroup = this.fb.group({
      nom:this.fb.control(this.menuItem ? this.menuItem.nom : '',Validators.required),
      entree: this.fb.control(this.menuItem ? this.menuItem.entree : '',Validators.required),
      plat: this.fb.control(this.menuItem ? this.menuItem.plat : '',Validators.required),
      description:this.fb.control(this.menuItem ? this.menuItem.description : '',Validators.required),
      prix: this.fb.control(this.menuItem ? this.menuItem.prix : '',[Validators.required,Validators.pattern('^[0-9]*\\.?[0-9]+$')]),
      disponibilite: this.fb.control(this.menuItem ? this.menuItem.disponibilite : false),
      evaluation: this.fb.control(this.menuItem ? this.menuItem.serverEvaluation : 0),
      image: this.fb.control('',this.isUpdateMode ? [] : Validators.required),
      imageName: this.fb.control(this.menuItem? this.menuItem.image: '',Validators.required)
    });
  }
  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const img = input.files[0];
      this.menuItemFormGroup.patchValue({
        image : img,
        imageName: img.name
      })
    }
  }
  private handleSuccess(message: string, data: any) {
    const dialogRef = this.dialog.open(SubmitPopupComponent, {
      width:'450px',
      data: {
        msgTitle: "Succès",
        msgContent: message,
        icon: "check_circle_outline"
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      const menuItemWithEvaluation = {
        ...data,
        serverEvaluation: data.evaluation
      };
      this.dialogRef.close(menuItemWithEvaluation);
    });
  }
  private handleError(error: any){
    console.error("An error occurred:", error);
    this.dialog.open(SubmitPopupComponent, {
      width:'450px',
      data: {
        msgTitle: "Erreur "+ error.status,
        msgContent: error.error.message,
        icon: "error_outline"
      }
    });
  }
  submit() {
    // verifier la validité du form
    if (this.menuItemFormGroup.invalid) {
      Object.keys(this.menuItemFormGroup.controls).forEach(field => {
        const control = this.menuItemFormGroup.get(field);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }
    let formData = new FormData();
    formData.set('nom',this.menuItemFormGroup.value.nom);
    formData.set('entree',this.menuItemFormGroup.value.entree);
    formData.set('plat',this.menuItemFormGroup.value.plat);
    formData.set('description',this.menuItemFormGroup.value.description);
    formData.set('prix',this.menuItemFormGroup.value.prix);
    formData.set('disponibilite',this.menuItemFormGroup.value.disponibilite)
    formData.set('image',this.menuItemFormGroup.value.image);
    formData.set('evaluation',this.menuItemFormGroup.value.evaluation);

    if(this.isUpdateMode){
      this.menuService.updateMenuItem(this.menuItem!.id, formData).subscribe({
        next:
            (data) => this.handleSuccess("La modification a été réalisé avec succès.", data)
        ,
        error:
            (error) => this.handleError(error)
      })
    }
    else{
      this.menuService.postMenuItem(formData).subscribe({
        next:
            (data) => this.handleSuccess("L'ajout a été réalisé avec succès.", data)
        ,
        error:
            (error) => this.handleError(error)
      })
    }
  }

}
