import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //Define input fields and bind them to the template.
  @Input() featureName:string;
  @Input() featurePercent:string;
  @Input() featurePercentStr:string;
  @Input() featureColor:string;
  featureWidth:string;

  constructor() { }

  ngOnInit() {
    this.featureWidth = "width: " + this.featurePercentStr;
  }

}
