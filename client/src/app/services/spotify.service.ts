import { Injectable } from '@angular/core';
import {lastValueFrom} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server

    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    return lastValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((response) => {
      return this.searchForHelper(category, response);
    }, (err) => {
      console.log("ERROR: Did not receive a valid response");
      return null;
    });
  }

  searchForHelper(category:string, response:object):ResourceData[] {
    if (response[category+"s"] == undefined) {
      console.log("WARNING: Response is undefined");
      return null as any;
    }
    if (category == 'artist') {
      return response[category+"s"]["items"].map(data => new ArtistData(data));
    } else if (category == 'album') {
      return response[category+"s"]["items"].map(data => new AlbumData(data));
    } else if (category == 'track') {
      return response[category+"s"]["items"].map(data => new TrackData(data));
    } else {
      console.log("ERROR: Unknown category");
      return null as any;
    }
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((response) => {
      return new ArtistData(response);
      // return this.getArtist(response);
    }, (err) => {
      console.log("ERROR: Did not receive a valid response");
      return null;
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress('/artist-related-artists/' + artistId).then((response) => {
      if (response == undefined) {
        console.log("WARNING: Response is undefined");
        return null as any;
      }
      else {
        let artistsArray:ArtistData[];
        artistsArray = response['artists'].map((data) => {
          return new ArtistData(data);
          // return this.getRelatedArtists(data);
        });
        if(artistsArray == undefined) {
          console.log("WARNING: Response is undefined");
          return null as any;
      }
        return artistsArray;
        }
      });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/' + artistId).then((response) => {
      if (response == undefined) {
        console.log("WARNING: Response is undefined");
        return null as any;
      }
      else {
        let trackArray:TrackData[];
        trackArray = response['tracks'].map((data) => {
          return new TrackData(data);
          // return this.getTopTracksForArtist(data);
        });
        if(trackArray == undefined) {
          console.log("WARNING: Response is undefined");
          return null as any;
      }
        return trackArray;
        }
      });
    // return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/' + artistId).then((response) => {
      if (response == undefined) {
        console.log("WARNING: Response is undefined");
        return null as any;
      }
      else {
        let albumArray:AlbumData[];
        albumArray = response['items'].map((data) => {
          return new AlbumData(data);
          // return this.getAlbumsForArtist(data);
        });
        if(albumArray == undefined) {
          console.log("WARNING: Response is undefined");
          return null as any;
      }
        return albumArray;
        }
      });
    // return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/' + albumId).then((response) => {
      return new AlbumData(response);
    }, (err) => {
      console.log("ERROR: Did not receive a valid response");
      return null;
    });
    // return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/' + albumId).then((response) => {
      if (response == undefined) {
        console.log("WARNING: Response is undefined");
        return null as any;
      }
      else {
        let trackArray:TrackData[];
        trackArray = response['items'].map((data) => {
          return new TrackData(data);
        });
        if(trackArray == undefined) {
          console.log("WARNING: Response is undefined");
          return null as any;
      }
        return trackArray;
        }
      });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/' + trackId).then((response) => {
      return new TrackData(response);
    }, (err) => {
      console.log("ERROR: Did not receive a valid response");
      return null;
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + trackId).then((response) => {
      if (response == undefined) {
        console.log("WARNING: Response is undefined");
        return null as any;
      }
      else {
        let trackFeatureArray:TrackFeature[]=[];
        // 'danceability', 'energy', 'speechiness', 'acousticness',
        //  'instrumentalness', 'liveness', 'valence'
        trackFeatureArray.push(new TrackFeature('danceability', response['danceability']));
        trackFeatureArray.push(new TrackFeature('energy', response['energy']));
        trackFeatureArray.push(new TrackFeature('speechiness', response['speechiness']));
        trackFeatureArray.push(new TrackFeature('acousticness', response['acousticness']));
        trackFeatureArray.push(new TrackFeature('instrumentalness', response['instrumentalness']));
        trackFeatureArray.push(new TrackFeature('liveness', response['liveness']));
        trackFeatureArray.push(new TrackFeature('valence', response['valence']));

        if(trackFeatureArray == undefined) {
          console.log("WARNING: Response is undefined");
          return null as any;
      }
        return trackFeatureArray;
        }
      });
  }
}
