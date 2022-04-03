import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  get userData() {
    return this.authService.userData;
  }

  get logout() {
    return this.authService.logout();
  }

  constructor( private authService: AuthService ) { }

}
