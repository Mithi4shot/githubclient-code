import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl = 'https://api.github.com/user';
  public searchBaseUrl = 'https://api.github.com/search/users?q=';

  constructor(public http: HttpClient) { }

  public getUserData = (username,password) => {  

    const token = window.btoa(username +':'+ password); //
    let headers = new HttpHeaders({'Authorization': `Basic ${token}`});
    return this.http.get(this.baseUrl,{headers:headers});
    
  }

  public setUserInfoInLocalStorage = (username) =>{

    localStorage.setItem('username',JSON.stringify(username));

  }

  public getUserInfoFromLocalStorage = () =>{

    return JSON.parse(localStorage.getItem('username'));;

  }

  public getUserInfo(baseUrl): Observable<any>{

    return this.http.get(baseUrl);

  }

  public getUserRepositories(repo_url,repo_page): Observable<any>{

    return this.http.get(`${repo_url}?page=${repo_page}&per_page=15`);
    
  }
  public getUserFollowers(followers_url,follow_page): Observable<any>{

    return this.http.get(`${followers_url}?page=${follow_page}`);
    
  }

  public getUserGists(gists_url): Observable<any>{

    return this.http.get(gists_url);
    
  }

  public search = (queryString: string) =>{

    return this.http.get(this.searchBaseUrl + queryString + '&per_page=8');
    
  }
}
