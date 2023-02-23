import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  localURL:string;
  imageURL:string;
  name:string;

  constructor() { }

  // On initialization, bind localURL to local page, imageURL to image for display, and name to name for display purposes
  ngOnInit() {
    this.localURL = this.resource.category + "/" + this.resource.id;
    this.imageURL = this.resource?.imageURL;
    this.name = this.resource?.name;
  }

}
