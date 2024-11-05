import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData) => {
        this.user = { ...userData, password: '' }; // Carga los datos del usuario desde el backend
      },
      error: (err) => {
        console.error('Error al cargar el perfil del usuario', err);
        this.snackBar.open('Error al cargar los datos del usuario. Inténtalo de nuevo más tarde.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    const userUpdate: Partial<User> = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      phone: this.user.phone,
      ...(this.user.password ? { password: this.user.password } : {}) // Solo incluye si hay una nueva contraseña
    };
  
    this.userService.updateProfile(userUpdate).subscribe({
      next: (updatedUser) => {
        console.log('Perfil actualizado con éxito', updatedUser);
        this.snackBar.open('Perfil actualizado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashbadmin/users']); // Redirigir a /dashbadmin/users después de guardar
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        this.snackBar.open('Error al actualizar el perfil. Inténtalo de nuevo más tarde.', 'Cerrar', { duration: 3000 });
      }
    });
  }
  

  onCancel(): void {
    this.router.navigate(['/dashbadmin/users']); // Redirigir a la página de usuarios si se cancela
  }
}
