import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { Tratamiento } from '../models/Tratamiento.models'; // Asegúrate de definir este modelo

@Injectable({
    providedIn: 'root'
})
export class TratamientoService {
    private baseUrl = `${appsettings.apiUrl}/api/tratamientos`;

    constructor(private http: HttpClient) {}

    getAllTratamientos(): Observable<Tratamiento[]> {
        return this.http.get<Tratamiento[]>(this.baseUrl);
    }

    getTratamientoById(id: number): Observable<Tratamiento> {
        return this.http.get<Tratamiento>(`${this.baseUrl}/${id}`);
    }

    saveTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
        return this.http.post<Tratamiento>(this.baseUrl, tratamiento);
    }

    updateTratamiento(id: number, updatedTratamiento: Tratamiento): Observable<Tratamiento> {
        return this.http.put<Tratamiento>(`${this.baseUrl}/${id}`, updatedTratamiento);
    }

    deleteTratamiento(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getTratamientosByConsulta(consultaId: number): Observable<Tratamiento[]> {
        return this.http.get<Tratamiento[]>(`${this.baseUrl}/consulta/${consultaId}`);
    }
}
