import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../Auth/services/local-storage.service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private localStorageService = inject(LocalStorageService)

  constructor(private router: Router){

  }

  logout(){
    this.localStorageService.removeValue('token');
    this.localStorageService.removeValue('email');
    this.router.navigate(['/'])

  }

  addPost(){
    this.router.navigate(['/home/addPost']);
  }
}
