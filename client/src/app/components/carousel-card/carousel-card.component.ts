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

  ngOnInit() {
    this.localURL = this.resource?.url;
    this.imageURL = this.resource?.imageURL;
    this.name = this.resource?.name;
  }

}
