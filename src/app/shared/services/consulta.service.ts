import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { Consulta } from '../models/Consulta.model'; // Asegúrate de definir este modelo

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {
    private baseUrl = `${appsettings.apiUrl}/api/consultas`;

    constructor(private http: HttpClient) {}

    getAllConsultas(): Observable<Consulta[]> {
        return this.http.get<Consulta[]>(this.baseUrl);
    }

    getConsultaById(id: number): Observable<Consulta> {
        return this.http.get<Consulta>(`${this.baseUrl}/${id}`);
    }

    getConsultasByPaciente(pacienteId: number): Observable<Consulta[]> {
        return this.http.get<Consulta[]>(`${this.baseUrl}/paciente/${pacienteId}`);
    }

    saveConsulta(consulta: Consulta): Observable<Consulta> {
        return this.http.post<Consulta>(this.baseUrl, consulta);
    }

    updateConsulta(id: number, updatedConsulta: Consulta): Observable<Consulta> {
        return this.http.put<Consulta>(`${this.baseUrl}/${id}`, updatedConsulta);
    }

    deleteConsulta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
