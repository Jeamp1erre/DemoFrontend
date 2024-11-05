import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import {Paciente} from '../models/Paciente.model';


@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    private baseUrl = `${appsettings.apiUrl}/api/pacientes`;
  
    constructor(private http: HttpClient) {}
  
    private createAuthorizationHeader(): HttpHeaders {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No se encontró un token de autorización');
        throw new Error('No se encontró un token de autorización');
      }
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    }
  
    getAllPacientes(): Observable<Paciente[]> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<Paciente[]>(this.baseUrl, { headers });
    }
  

    getPacienteById(id: number): Observable<Paciente> {
        const headers = this.createAuthorizationHeader();
        return this.http.get<Paciente>(`${this.baseUrl}/${id}`, { headers });
    }

    searchPaciente(nombre: string, apellido: string): Observable<Paciente[]> {
        const headers = this.createAuthorizationHeader();
        return this.http.get<Paciente[]>(`${this.baseUrl}/search`, {
            params: { nombre, apellido },
            headers
        });
    }

    savePaciente(paciente: Paciente): Observable<Paciente> {
        const headers = this.createAuthorizationHeader();
        return this.http.post<Paciente>(this.baseUrl, paciente, { headers });
    }

    updatePaciente(id: number, updatedPaciente: Paciente): Observable<Paciente> {
        const headers = this.createAuthorizationHeader();
        return this.http.put<Paciente>(`${this.baseUrl}/${id}`, updatedPaciente, { headers });
    }

    deletePaciente(id: number): Observable<void> {
        const headers = this.createAuthorizationHeader();
        return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
    }
}