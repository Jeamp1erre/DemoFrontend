import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { HistoriaMedica } from '../models/HistoriaMedica.model'; // Asegúrate de definir este modelo

@Injectable({
    providedIn: 'root'
})
export class HistoriaMedicaService {
    private baseUrl = `${appsettings.apiUrl}/api/historias-medicas`;

    constructor(private http: HttpClient) {}

    private createAuthorizationHeader(): HttpHeaders {
        const token = sessionStorage.getItem('token'); // Cambia esto si usas otro método de almacenamiento
        if (!token) {
            console.error('No se encontró un token de autorización');
            throw new Error('No se encontró un token de autorización');
        }
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    }

    getHistoriaMedicaById(id: number): Observable<HistoriaMedica> {
        const headers = this.createAuthorizationHeader(); // Agregado aquí
        return this.http.get<HistoriaMedica>(`${this.baseUrl}/${id}`, { headers });
    }

    saveHistoriaMedica(historiaMedica: HistoriaMedica): Observable<HistoriaMedica> {
        const headers = this.createAuthorizationHeader(); // Agregado aquí
        return this.http.post<HistoriaMedica>(this.baseUrl, historiaMedica, { headers });
    }

    updateHistoriaMedica(id: number, updatedHistoriaMedica: HistoriaMedica): Observable<HistoriaMedica> {
        const headers = this.createAuthorizationHeader(); // Agregado aquí
        return this.http.put<HistoriaMedica>(`${this.baseUrl}/${id}`, updatedHistoriaMedica, { headers });
    }

    deleteHistoriaMedica(id: number): Observable<void> {
        const headers = this.createAuthorizationHeader(); 
        return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
    }

    getHistoriaMedicaByPacienteId(pacienteId: number): Observable<HistoriaMedica> {
        const headers = this.createAuthorizationHeader(); // Agregado aquí
        return this.http.get<HistoriaMedica>(`${this.baseUrl}/paciente/${pacienteId}`, { headers });
    }
}
