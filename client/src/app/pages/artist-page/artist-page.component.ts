import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  providers: [ SpotifyService ]
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  artistImg:string;
  genreArray:string[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((data) => {
      this.artist = data;
      this.artistImg = this.artist.imageURL;
      this.genreArray = this.artist.genres;
    });

    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = data;
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
      this.albums = data;
    });

  }

}