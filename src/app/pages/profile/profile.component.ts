import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(public router: Router) { }

  ngOnInit() {
    const username = localStorage.getItem('username');
    this.user = username;
  }
  CheckProfile(){
    this.router.navigate(['/pages/view-personal-info']);
  }

}
