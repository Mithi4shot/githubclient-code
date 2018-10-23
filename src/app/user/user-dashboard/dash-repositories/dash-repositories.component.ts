import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dash-repositories',
  templateUrl: './dash-repositories.component.html',
  styleUrls: ['./dash-repositories.component.css']
})
export class DashRepositoriesComponent implements OnInit {

  @Input() repositoryName : string;
  @Input() repositoryUrl : string;

  constructor() { }

  ngOnInit() {
  }

}
