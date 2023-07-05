import React, { useState, useEffect, useContext } from 'react';
//Details
import Dropdown from '../Details/Dropdown';
import Listbox from '../Details/Listbox';
import Detail from '../Details/Detail';

//POST/GET
import axios from 'axios';

//Design
import '../index.css';
import '../Design/dropdown.css'

//Hooks and components
import { Credentials } from '../components/Credentials';
import { useAuthContext } from "../hooks/useAuthContext"


const Music = () => {

    //Gets credentials from credentials tab.
    const spotify = Credentials();  
    const {user} = useAuthContext()
  
    //Data Array
    const data = [
      {value: 1, name: 'A'},
      {value: 2, name: 'B'},
      {value: 3, name: 'C'},
    ]; 
  
    const [token, setToken] = useState('');  
    const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
    const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
    const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
    const [trackDetail, setTrackDetail] = useState(null);


    //Call API
    useEffect(() => {
      axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenResponse => {      
        setToken(tokenResponse.data.access_token);
  
        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
        })
        .then (genreResponse => {        
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        });
        
      });
  
    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 
  
    const genreChanged = val => {
      setGenres({
        selectedGenre: val, 
        listOfGenresFromAPI: genres.listOfGenresFromAPI
      });
  
      axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });
  
      console.log(val);
    }
  
    //Playlist Change
    const playlistChanged = val => {
      console.log(val);
      setPlaylist({
        selectedPlaylist: val,
        listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
      });
    }
    
    //Button search
    const buttonClicked = e => {
      e.preventDefault();
  
      axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      .then(tracksResponse => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      });
    }
  
    const listboxClicked = val => {
  
      const currentTracks = [...tracks.listOfTracksFromAPI];
  
      const trackInfo = currentTracks.filter(t => t.track.id === val);
  
      setTrackDetail(trackInfo[0].track);
  
    }

    //Save to database to retrieve as favorite.
    const handleAddToFavorites = async () => {    
        console.log("add to favourites!")
        const selectedSong = {
            name: trackDetail.name,
            artist: trackDetail.artists[0].name,
            email: user.email 
          };
        
          axios.post('/api/songs', selectedSong)
            .then(response => {
              console.log(response.data.message);
            })
            .catch(error => {
              console.error(error);
            });
      }
  
    return (
      <div className="container">

        <button className='fav-button' onClick={handleAddToFavorites}>
          Add to Favorites
        </button>

        <form onSubmit={buttonClicked}>        
            <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
            <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
            <div className="col-sm-6 row form-group px-0">
            <button type='submit' className="buttonsubmit btn btn-success col-sm-12 my-2">
    Search
  </button>
   
            </div>
            <div className="row col-sm-6">
              <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
              {trackDetail && <Detail {...trackDetail} /> }
            </div>        
        </form>
      </div>
    );
  }

export default Music;
