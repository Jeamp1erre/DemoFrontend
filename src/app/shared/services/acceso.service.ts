import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../../../../Frontendu/src/app/settings/appsettings';
import { Observable } from 'rxjs';
import { Login } from '../../../../../Frontendu/src/app/models/Login';
import { LoginResponse } from '../../../../../Frontendu/src/app/models/LoginResponse'; // Asegúrate de importar el modelo
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  private router = inject(Router);
  constructor() {}

  login(objeto: Login): Observable<LoginResponse> { // Cambia el tipo de retorno
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, objeto);
  }

  
  logout() {
    sessionStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
