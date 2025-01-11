import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/ResponseApi_GetPosts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'post-card-post',
  standalone: true,
  imports: [],
  providers: [PostService, DatePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent implements OnInit{


  @Input() post: Post

  contador: number = 0;

  date : string = "";

  constructor(){
    this.post = {

      id:         0,
      title:     "",
      publicationDate: new Date(""),
      linkImage: ""

    }
  }

  ngOnInit() {
    if (this.post.publicationDate) {
      this.date = this.formatDate(new Date(this.post.publicationDate));
    }
  }


  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }


}
