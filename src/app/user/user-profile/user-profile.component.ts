import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  public scrollToTop: boolean = false;
  public userInfo : any;
  public repositories : any;
  public followers : any;
  public gists : any;
  public gistBaseUrl : string; 
  public username: string;
  public usernameToSearch:string = '';
  public login_username: string;
  public node_id:string;
  public pageValue_repo: number;
  public pageValue_follow: number;
  public pageValue_gists: number;

  public total_repo_pages: number;
  public total_follow_pages: number;
  public total_gist_pages: number;
  
  public results: any = [];
  public queryField: FormControl = new FormControl();
  

  constructor(private userService: UserService, public router: Router, public _route: ActivatedRoute) { 
  
  }

  ngOnInit() {

    this.node_id = Cookie.get('node_id');
    
    this.login_username = this.userService.getUserInfoFromLocalStorage();

    this.checkStatus();

    this.queryField.valueChanges.subscribe((queryField) =>{

      this.usernameToSearch = queryField;
      this.userService.search(queryField).subscribe((response) =>{
        
         this.results = response; 

        },(err: HttpErrorResponse) => {

          if(err.status === 403)
          {
            this.router.navigate(['/403']);
          }
          if(err.status === 422)
          {
            this.router.navigate(['/422']);
          }

    
        });
      });
 

    this._route.params.subscribe(params => {

      this.pageValue_repo = 0;
      this.pageValue_follow = 0;
      this.pageValue_gists = 0;
      this.username = params['login-username'];
      this.userDetails();
    
    });

  }

  // check user authentication

  public checkStatus: any = () =>{

    if(Cookie.get('node_id') === undefined || Cookie.get('node_id') === '' || Cookie.get('node_id') === null){

      this.router.navigate(['/login']);

      return false;
    }
    else{

      return true;

    }
  }

  // Fetch user Details

  public userDetails = () =>{
    
    this.userService.getUserInfo(`https://api.github.com/users/${this.username}`).subscribe((apiResponse)=>{

      this.userInfo = apiResponse;

      this.userRepositories();

    },(err: HttpErrorResponse) => {

      if(err.status === 404)
      {
        this.router.navigate(['/404']);
      }

    });
  }

  // Fetch user Repo
  
  public userRepositories = () =>{

    this.pageValue_repo++;

    this.userService.getUserRepositories(this.userInfo.repos_url,this.pageValue_repo).subscribe((apiResponse)=>{

      this.repositories = apiResponse;

      if(this.pageValue_repo === 1)
      {
        this.total_repo_pages = Math.ceil(this.userInfo.public_repos/15);
        this.userFollowers();  
      }

    });
  }

  public userRepositoriesPrevious = () =>{

    this.pageValue_repo--;

    this.userService.getUserRepositories(this.userInfo.repos_url,this.pageValue_repo).subscribe((apiResponse)=>{

      this.repositories = apiResponse;

    });
  }

  // Fetch user Follower

  public userFollowers = () =>{

    this.pageValue_follow++;

    this.userService.getUserFollowers(this.userInfo.followers_url,this.pageValue_follow).subscribe((apiResponse)=>{

    this.followers = apiResponse;      

      if(this.pageValue_follow === 1)
      {
        this.total_follow_pages = Math.ceil(this.userInfo.followers/30);
        this.userGist();
      }
    });
  }

  public userFollowersPrevious = () =>{

    this.pageValue_follow--;

    this.userService.getUserFollowers(this.userInfo.followers_url,this.pageValue_follow).subscribe((apiResponse)=>{

      this.followers = apiResponse;      
    
    });
  }

  // Fetch user gist

  public userGist = () =>{

    this.pageValue_gists++;

    this.gistBaseUrl = `https://api.github.com/users/${this.userInfo.login}/gists?page=${this.pageValue_gists}`; 

    this.userService.getUserGists(this.gistBaseUrl).subscribe((apiResponse)=>{

      this.gists = apiResponse;
      
      if(this.pageValue_gists === 1)
      {
        this.total_gist_pages = Math.ceil(this.userInfo.public_gists/30);
          
      }
    
    });
  }

  public userGistPrevious = () =>{

    this.pageValue_gists--;

    this.gistBaseUrl = `https://api.github.com/users/${this.userInfo.login}/gists?page=${this.pageValue_gists}`; 

    this.userService.getUserGists(this.gistBaseUrl).subscribe((apiResponse)=>{

      this.gists = apiResponse;
    
    });
  }

  // clear search textbox after navigate to other route

  public clearSearch = () =>{

    this.usernameToSearch = null;
    
  }

  public logout = () =>{

    Cookie.delete('node_id');

    this.router.navigate(['/']);
    
  }

}
