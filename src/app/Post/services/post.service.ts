import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../Auth/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetPosts } from '../interfaces/ResponseApi_GetPosts';
import { QueryObject } from '../interfaces/QueryObject';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl: string = "http://localhost:5231/api/Post";
  public errors: string[] = []
  private http = inject(HttpClient);

  constructor(private authService: AuthService) {}


  async GetAllPosts(queryObject: QueryObject): Promise<ResponseAPIGetPosts>{
    try{
      const params = new HttpParams({ fromObject: { ...queryObject } });
      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetPosts>(
          `${this.baseUrl}`, {params}));
      return Promise.resolve(response);

    } catch (error){
      console.log('Error en GetAllProducts',error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message)

      return Promise.reject(error);
    }
  }

  //** Método para crear un producto, enviando los datos y una imagen asociada. */
  async CreatePost( Title: string, imageFile: File): Promise<string>{
    try{
      const formData = new FormData();

      formData.append('Title', Title);

      formData.append('imageFile', imageFile, imageFile.name);


      const token = this.authService.getToken();

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


      return Promise.resolve(response);

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
