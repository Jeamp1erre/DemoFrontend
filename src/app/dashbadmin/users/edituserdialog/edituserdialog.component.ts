import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../shared/models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edituserdialog',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './edituserdialog.component.html',
  styleUrls: ['./edituserdialog.component.css']
})
export class EdituserdialogComponent {
  roles: string[] = ['USER', 'ADMIN'];

  constructor(
    public dialogRef: MatDialogRef<EdituserdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
