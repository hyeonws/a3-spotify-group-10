import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    // var toSearch = this.spotifyService.searchFor(this.searchString, this.searchCategory).toString();
    // let obj = JSON.parse(toSearch);
    // this.spotifyService.searchFor(this.searchString, this.searchCategory).then((data) => {
    //   if(data) {
    //     console.log(data);
    //   } else {
    //     console.log("No data to search for");
    //   }
    //   this.resources = data;
    //   if(this.resources) {
    //     console.log(this.resources);
    //   } else {
    //     console.log("No resources data");
    //   }
    // });

    // console.log("Search clicked!");
    let response = this.spotifyService.searchFor(this.searchCategory, this.searchString);
    console.log(response);

    // how do i pull the data out of this?? am stupid
    // response.then((data) => {
    //   console.log(data);
    //   console.log(data["artists"]);
    //   console.log(data["artists"]["items"]);
    //   console.log(data["artists"]["items"][0]);
    //   console.log(new ArtistData(data["artists"]["items"][0]));
    // });

    // CANT USE CODE BELOW BECAUSE RESPONSE RETURNS AN OBJECT OF ARRAYS - need to access array to make data
    // let data;
    // if (this.searchCategory == 'album') {
    //   let data = new AlbumData(response);
    // } else if (this.searchCategory == 'artist') {
    //   let data = new ArtistData(response);
    // } else if (this.searchCategory == 'track') {
    //   let data = new TrackData(response);
    // }

    // console.log(data);
  }

}
