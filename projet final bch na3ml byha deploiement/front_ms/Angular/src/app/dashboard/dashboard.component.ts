import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/AuthService";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
    '../../assets/css/sb-admin-2.min.css',
    '../../assets/vendor/fontawesome-free/css/all.min.css',
  ]
})
export class DashboardComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {

  }
  logout(): void {
    this.authService.logout();

  }
}
