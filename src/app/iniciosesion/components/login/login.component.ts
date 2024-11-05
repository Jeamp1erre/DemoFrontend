import { Component, inject } from '@angular/core';
import { AccesoService } from '../../../shared/services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../../../shared/models/LoginResponse'; // Asegúrate de tener este modelo
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from '../../../shared/models/LoginRequest'; // Asegúrate de tener este modelo
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public errorMessage: string = '';

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const objeto: LoginRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };

    this.accesoService.login(objeto).subscribe({
      next: (data: LoginResponse) => {
        console.log('Inicio de sesión exitoso:', data);
        sessionStorage.setItem('token', data.token); // Guarda el token en sessionStorage

        // Redirigir según el rol del usuario
        if (data.role.toLowerCase() === 'admin') {
          console.log('Redirigiendo a admin dashboard'); // Log para verificar
          this.router.navigate(['/dashbadmin']); // Redirige al dashboard de admin
        } else {
          console.log('Redirigiendo a user dashboard'); // Log para verificar
          this.router.navigate(['/dashboarduser']); // Redirige al dashboard de usuario
        }
      },
      error: (err) => {
        this.errorMessage = 'Error en el inicio de sesión. Por favor, verifica tus credenciales.';
        console.error('Error en el inicio de sesión:', err);
      }
    });
  }
}
