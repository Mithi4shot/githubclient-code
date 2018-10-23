import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gists',
  templateUrl: './gists.component.html',
  styleUrls: ['./gists.component.css']
})
export class GistsComponent implements OnInit {

  @Input() gists : any;
  
  constructor() { }

  ngOnInit() {
  }

}
