import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public username: string;
  public userInfo: any;
  public repositories: any;
  public pageValue: number = 0;

  constructor(public _route: ActivatedRoute, public userService: UserService, public router: Router) { }

  ngOnInit() {

    this.username = this._route.snapshot.paramMap.get('dash-username');

    this.userDetails();

  }

  public userDetails = () => {

    this.userService.getUserInfo(`https://api.github.com/users/${this.username}`).subscribe((apiResponse) => {

      this.userInfo = apiResponse;

      this.userRepositories(); 

    },(err: HttpErrorResponse) => {

      if(err.status === 404)
      {
        this.router.navigate(['/404']);
      }

    });
  }

  public userRepositories = () => {

    this.pageValue++;
    this.userService.getUserRepositories(this.userInfo.repos_url, this.pageValue).subscribe((apiResponse) => {

      this.repositories = apiResponse;

    });
  }
}
