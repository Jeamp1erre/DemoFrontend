import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { Diagnostico } from '../models/Diagnostico.model'; // Asegúrate de definir este modelo

@Injectable({
    providedIn: 'root'
})
export class DiagnosticoService {
    private baseUrl = `${appsettings.apiUrl}/api/diagnosticos`;

    constructor(private http: HttpClient) {}

    getAllDiagnosticos(): Observable<Diagnostico[]> {
        return this.http.get<Diagnostico[]>(this.baseUrl);
    }

    getDiagnosticoById(id: number): Observable<Diagnostico> {
        return this.http.get<Diagnostico>(`${this.baseUrl}/${id}`);
    }

    saveDiagnostico(diagnostico: Diagnostico): Observable<Diagnostico> {
        return this.http.post<Diagnostico>(this.baseUrl, diagnostico);
    }

    updateDiagnostico(id: number, updatedDiagnostico: Diagnostico): Observable<Diagnostico> {
        return this.http.put<Diagnostico>(`${this.baseUrl}/${id}`, updatedDiagnostico);
    }

    deleteDiagnostico(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getDiagnosticosByConsulta(consultaId: number): Observable<Diagnostico[]> {
        return this.http.get<Diagnostico[]>(`${this.baseUrl}/consulta/${consultaId}`);
    }
}
