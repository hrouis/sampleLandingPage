import {RenderingService} from '../utils/rendering-service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [RenderingService]
})
export class LandingPageComponent implements OnInit {

  appName = "Courses Privées";
   message = "Courses Privees Message Statement";

  constructor(
 
  private renderingService : RenderingService) {
      this.renderingService.show =true;
  }
  
  ngOnInit() {
  }
  

}
