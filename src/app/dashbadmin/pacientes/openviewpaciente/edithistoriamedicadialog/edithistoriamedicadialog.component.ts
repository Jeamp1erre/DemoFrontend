import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistoriaMedica } from '../../../../shared/models/HistoriaMedica.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edithistoriamedicadialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, CommonModule, MatInputModule, FormsModule, MatButtonModule
  ],
  templateUrl: './edithistoriamedicadialog.component.html',
  styleUrls: ['./edithistoriamedicadialog.component.css']
})
export class EdithistoriamedicadialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EdithistoriamedicadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoriaMedica
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
