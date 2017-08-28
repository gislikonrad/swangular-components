import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  url: string = 'http://petstore.swagger.io/v2/swagger.json';
  apikey: string = '';

  constructor() { }

  ngOnInit() {
  }

}
