import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginComponent } from './Auth/pages/login/login.component';
import { LocalStorageService } from './Auth/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Catedra3_Cliente_Web';
  private localStorageService = inject(LocalStorageService);
    private router = inject(Router);
  ngOnInit(): void {
    initFlowbite();

    const token = this.localStorageService.getVariable('token');

    if (token) {
      this.router.navigate(['home']);
    }
  }
}
