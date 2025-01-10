import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AuhtDto } from '../interfaces/AuthDto'
import { ResponseAPIRegisterLogin } from '../interfaces/ResponseApi_Register_Login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5231/api/Auth';
  public errors : string[] =[];
  private http = inject(HttpClient);




  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private authStatus = new BehaviorSubject<boolean>(false);


  authStatus$ = this.authStatus.asObservable();


  constructor() {}


  async login(auhtDto: AuhtDto ): Promise<ResponseAPIRegisterLogin > {
    try {
      const response = await firstValueFrom(this.http.post<ResponseAPIRegisterLogin>
        (this.baseUrl+'/login', auhtDto));
        return Promise.resolve(response);

    } catch (error) {
      console.log("error en login", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || "error desconosido");
      return Promise.reject(this.errors)

    }

  }



  /*
  login(auhtDto: AuhtDto ): Observable<ResponseAPIRegisterLogin > {
    const body = { correo: email, contraseña: password };
    return this.httpClient.post<ResponseAPIRegisterLogin>(
      `${this.apiUrl}/login`,
    ).pipe(
      map((response) => {
        this.saveToken(response.token); // Guarda el token después de recibirlo
        this.authStatus.next(true);
        this.isLoggedInSubject.next(true);
        return response; // Devuelve la respuesta completa
      })
    );
  }


  saveToken(token: string) {
    this.cookieService.set('token', token, 1, '/', '', false, 'Strict');
  }


  getToken(): string | null {
    return this.cookieService.get('token');
  }


  logout() {
    this.cookieService.delete('token', '/');
    this.httpClient.post('http://localhost:5134/taller-backend/auth/logout', {}).subscribe(() => {
      // Manejar la respuesta exitosa
      this.router.navigate(['/login']);
      this.showLogoutNotification();
      this.isLoggedInSubject.next(false);

    }, (error: any) => {
      // Manejar errores, si es necesario
      console.error('Error al cerrar sesión:', error);
    });
  }


  showLogoutNotification(): void {
    alert('Sesión cerrada correctamente.');
  }


  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }


  isAdmin(): boolean {
    const payload = this.getPayload();
    return payload && payload.rol === 'admin';
  }


  getPayload(): any {
    const token = this.cookieService.get('token');
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    return null;
  }


  addTokenToHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return this.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.headers;
  }


  protectedRequest(endpoint: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${endpoint}`, {
      headers: this.addTokenToHeaders()
    });
  } */
}
