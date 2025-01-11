import { Component } from '@angular/core';
import { FormAddPostComponent } from '../../components/form-add-post/form-add-post.component';

@Component({
  selector: 'app-add-post-page',
  standalone: true,
  imports: [FormAddPostComponent],
  templateUrl: './add-post-page.component.html',
  styleUrl: './add-post-page.component.css'
})
export class AddPostPageComponent {

}
