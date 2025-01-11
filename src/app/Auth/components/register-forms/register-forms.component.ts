import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuhtDto } from '../../interfaces/AuthDto';

@Component({
  selector: 'auth-register-forms',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService, LocalStorageService],
  templateUrl: './register-forms.component.html',
  styleUrl: './register-forms.component.css'
})
export class RegisterFormsComponent {

  forms!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  successMessage: string = '';

  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);


  constructor(private FormBuilder: FormBuilder){}


  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.forms = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/(?=.*\d)/)]],
    })
  }






  async register(){
    console.log(this.forms.value)

    if(this.forms.invalid){
      console.log("form invalido");
      return;

    }

    try{

      const auhtDto: AuhtDto ={
        email:     this.forms.value.email,
        password:  this.forms.value.password,
      }
      const response = await this.authService.register(auhtDto);



      if (response.user.token){
        this.localStorageService.setVariable('token', response.user.token);
        this.localStorageService.setVariable('email', response.user.email);
        console.log("email:", this.localStorageService.getVariable('email'));

        this.successMessage = '¡Registro exitoso! Redirigiendo...';


        await setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000);


      }

      if(response){
        this.error = false;
        this.errorMessage = [];
        console.log(response);
      }
      else{
        this.error = true;
        this.errorMessage=  this.authService.errors;
        console.log(this.errorMessage)
      }

    }catch(error:any){

      console.log('Error en login', error);
      this.error = true;
      this.errorMessage.push(error)

    }finally{
      console.log('peticion finalizada');
      this.forms.reset();
      this
    }

    console.log('Errores:', this.errorMessage);
    console.log('aaaa:', this.error);

  }


  get emailInvalido(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }




  get paswordInvalido(){
    return this.forms.get('password')?.invalid && this.forms.get('password')?.touched;
  }
}
