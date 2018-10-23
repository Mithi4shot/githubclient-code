import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public homepage:string;

  constructor(public route:Router, public userService: UserService) { }

  ngOnInit() {

    this.homepage = this.userService.getUserInfoFromLocalStorage();
  }

  public goBack = () =>{

    this.route.navigate(['/profile',this.homepage]);

  }

}
