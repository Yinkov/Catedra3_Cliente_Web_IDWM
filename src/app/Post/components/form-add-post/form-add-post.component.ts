import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'post-form-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-add-post.component.html',
  styleUrl: './form-add-post.component.css'
})
export class FormAddPostComponent implements OnInit {


  forms!: FormGroup;

  selectedFile: File | null = null;
  previewImageUrl: string | null = null;

  error: boolean = false;

  errorMessage: string[] = [];



  private postService: PostService = inject(PostService)



  constructor(private FormBuilder: FormBuilder){}


  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.forms = this.FormBuilder.group({
      Title: ['', [Validators.required, Validators.minLength(5)]],
      imageFile: ['', [Validators.required ]],
    })
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];


      const image = new FileReader();
      image.onload = () => {
        this.previewImageUrl = image.result as string;
      };
      image.readAsDataURL(this.selectedFile);
    }
  }


  async onSubmit(){
    console.log(this.forms.value)
    console.log(this.selectedFile)
    if(this.forms.invalid){
      console.log("FORM invalido");
      return;

    }
    if (this.selectedFile){
      try{
        console.log("se detecta la imagen");

        const response = await this.postService.CreatePost(this.forms.value.Title, this.selectedFile)

        if(response){
          this.error = false;
          this.errorMessage = [];
          console.log(response);
        }
        else{
          this.error = true;
          this.errorMessage=  this.postService.errors;
          console.log(this.errorMessage)
        }

      }catch(error: any){
        console.error('Error en onSubmit', error);
        this.error = true;


        if (error instanceof HttpErrorResponse) {

          const errorMessage = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
          this.errorMessage.push(errorMessage);
        } else {

          this.errorMessage.push(error.toString());
        }
      }finally{
        console.log('peticion finalizada');
        this.forms.reset();
        this.previewImageUrl = null;
      }
    }
    console.log('Errores:', this.errorMessage);
    console.log('Error:', this.error);

  }




  get titleInvalido(){
    return this.forms.get('Title')?.invalid && this.forms.get('Title')?.touched;
  }


  get imageFileInvalido(){
    return this.forms.get('imageFile')?.invalid && this.forms.get('imageFile')?.touched;
  }
}
