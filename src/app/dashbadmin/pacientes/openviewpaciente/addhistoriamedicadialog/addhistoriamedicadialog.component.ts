import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HistoriaMedica } from '../../../../shared/models/HistoriaMedica.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-addhistoriamedicadialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './addhistoriamedicadialog.component.html',
  styleUrls: ['./addhistoriamedicadialog.component.css']
})
export class AddhistoriamedicadialogComponent {
  newHistoriaMedica: HistoriaMedica = {
    id: 0,
    antecedentesMedicos: '',
    cirugiasAnteriores: '',
    alergias: '',
    antecedentesFamiliares: '',
    pacienteId: 0 // Este ID se asignará al abrir el diálogo
  };

  constructor(public dialogRef: MatDialogRef<AddhistoriamedicadialogComponent>) {}

  onAdd(): void {
    this.dialogRef.close(this.newHistoriaMedica);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
