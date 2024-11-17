import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout();

  }
}
