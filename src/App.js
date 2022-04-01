import {useEffect, useState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
//NIZAR MAYRALDO
function App() {
  
  const clientid = process.env.REACT_APP_SKEY
  const redirect = "http://localhost:3000/"
  const auth_endpoin = "https://accounts.spotify.com/authorize"
  const respon_type = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [tombol, setTombol] = useState(`Select`)

  useEffect(  ()  =>  {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash =""
      window.localStorage.setItem("token", token)
      
    }

    setToken(token)

  }, [])

  const logout = () =>{
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtist = async(e) =>{
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search",{
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "artist"
      }
    })
    setArtists(data.artists.items)
    console.log(artists);
  }

  const renderhasil = () => {
    return artists.map(artist => (
      <div key={artist.key} className="card">
        {artist.images.length ? <img width={"100%"} className="card-img-top" src={artist.images[0].url} alt="cover"/> : <div>No Image</div>}
        <div className="card-body">
          <h5 className="card-title">Artist : {artist.name}</h5>
        </div>
        <button onClick={berubah} className="btn btn-success">{tombol}</button>
      </div>
    ))
    
  }

const berubah = () => {
  console.log("masuk");
  if(tombol === `Select`){
    setTombol(`Deselect`)
  }
  else if(tombol === `Deselect`){
    setTombol(`Select`)
  }
}

  return (
    <div className="App">
      <header className="App-header">
      <div className="container-md">
        
        <h1>Spotify search</h1>

          {!token ?
          <a href={`${auth_endpoin}?client_id=${clientid}&redirect_uri=${redirect}&response_type=${respon_type}`}>Login to Spotify</a>

           : <button onClick={logout}>Logout</button>}
          

          {token ?
            <form onSubmit={searchArtist}>
              <input type="text" onChange={e=> setSearchKey(e.target.value)}/>
              <button type="submit">search</button>
            </form>
            : <h2>Please login</h2>
          }
          <div className='row row-cols-1 row-cols-md-2 g-4'>
            {renderhasil()}
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;
