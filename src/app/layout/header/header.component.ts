import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName
  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('email');
  }
  onLogout() {
    this.loginService.Logout();
    //localStorage.removeItem('token');
    //localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

}
