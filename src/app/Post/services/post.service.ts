import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetPosts } from '../interfaces/ResponseApi_GetPosts';
import { QueryObject } from '../interfaces/QueryObject';
import { LocalStorageService } from '../../Auth/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = "http://localhost:5231/api/Post";
  public errors: string[] = []
  private http = inject(HttpClient);

  constructor(private localStorageService: LocalStorageService) {}

  async GetAllPosts(queryObject: QueryObject): Promise<ResponseAPIGetPosts> {
    try {
      const params = new HttpParams({ fromObject: { ...queryObject } });

      const token = this.localStorageService.getVariable('token');

      if (!token) {
        throw new Error('Token no encontrado');
      }

      // Configura los encabezados y otros parámetros correctamente
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetPosts>(`${this.baseUrl}`, {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      return Promise.resolve(response);
    } catch (error) {
      console.error('Error en GetAllPosts:', error);
      const e = error as HttpErrorResponse;
      this.errors.push(e.message);

      return Promise.reject(error);
    }
  }


  async CreatePost( Title: string, imageFile: File): Promise<string>{
    try{
      const formData = new FormData();

      formData.append('Title', Title);

      formData.append('image', imageFile, imageFile.name);


      const token = this.localStorageService.getVariable('token');

      if (!token) {
          throw new Error('Token no encontrado');
      }

      const response = await firstValueFrom(
          this.http.post<string>(`${this.baseUrl}`, formData, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          })
      );

      console.log("token: ",token)


      if (typeof response === 'string') {
        return Promise.resolve(response);;
      } else {
        throw new Error('No se recibió un mensaje de éxito del servidor');
      }



    }catch (error){
      console.log('Error en CreateProduct',error);
      if(error instanceof HttpErrorResponse){
        const errorMessage =
          typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }


      return Promise.reject(error);
    }
  }
}
