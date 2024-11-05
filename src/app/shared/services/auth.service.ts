import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = `${appsettings.apiUrl}/auth`;

    constructor(private http: HttpClient) {}

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
    }
}
