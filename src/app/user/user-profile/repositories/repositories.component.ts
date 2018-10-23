import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  @Input() repositoryName : string;
  @Input() repositoryDescription : string;
  @Input() repositoryLanguage : string;
  @Input() repositoryUrl : string;
  @Input() last : string;


  constructor() { }

  ngOnInit() {
  }

}
