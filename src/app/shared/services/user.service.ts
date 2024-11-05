import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${appsettings.apiUrl}/usuarios`; // Cambiado a "usuarios"

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

  getAllUsers(): Observable<User[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  getUserById(id: number): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  updateUser(id: number, user: User): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  updateProfile(user: Partial<User>): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<User>(`${this.apiUrl}/me`, user, { headers });
  }
  

  createUser(user: User): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

 
  getUserProfile(): Observable<User> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
}

  
}
