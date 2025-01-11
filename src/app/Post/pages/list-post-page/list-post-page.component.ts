import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PaginacionComponent } from '../../../_shared/components/paginacion/paginacion.component';
import { CardPostComponent } from '../../components/card-post/card-post.component';
import { QueryObject } from '../../interfaces/QueryObject';
import { Post } from '../../interfaces/ResponseApi_GetPosts';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-post-page',
  standalone: true,
  imports: [HttpClientModule, CommonModule, PaginacionComponent, CardPostComponent],
  templateUrl: './list-post-page.component.html',
  styleUrl: './list-post-page.component.css'
})
export class ListPostPageComponent {

  query: QueryObject = {
    pageNumber: 1,
    pageSize: 10,
  }

  cantPosts: number =0;

  cantPag: number = 0;

  postArray: Post[] = []


  private postService: PostService = inject(PostService)


  ngOnInit(): void {
    this.getAllPost();
  }

  //** Método para obtener todos los productos según la consulta actual. */
  getAllPost(){

    this.postService.GetAllPosts(this.query)
      .then((post) => {
        this.postArray = post.posts
        this.cantPosts = post.total
        this.calcularCantPaginas();
      }).catch((error) =>{
        console.log(error);
      })
  }


  calcularCantPaginas(){
    if(this.query.pageSize)
      this.cantPag = Math.ceil(this.cantPosts / this.query.pageSize);
  }



  onPageChanged(page: number): void {
    this.query.pageNumber = page;
    this.getAllPost();
  }
}
