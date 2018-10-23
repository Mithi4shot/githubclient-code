import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public userData: any;

  constructor(private toastr: ToastrService, public router: Router, public userService: UserService) { }

  ngOnInit() {
  }

  public displayDetails: any = () => {

    if (!this.username) {
      this.toastr.warning('Username missing');
    }
    else if (!this.password) {
      this.toastr.warning('Password missing');
    }
    else {
      
      this.userService.getUserData(this.username,this.password).subscribe((apiResponse) => {

        
        this.userData = apiResponse;
        Cookie.set('node_id', this.userData.node_id);
        this.userService.setUserInfoInLocalStorage(this.userData.login);
        this.router.navigate(['/profile',this.userData.login]);
        
      }, (err: HttpErrorResponse) => {

        this.username = null;
        this.password = null;
        this.toastr.error('username or password incorrect','error');
        console.log(err);

      });

    }

  }

}
