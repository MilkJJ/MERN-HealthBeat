import React from 'react';
import '../Design/Details.css'

const Detail = ({album, artists, name}) => {

    return (
        <div className="offset-md-1 col-sm-4">
          <div className="card">
          <div className="card-body">
          <img src={album.images[0].url} className="albumcover card-img" alt={name} />
          <br/>
                <table className="table">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Artist:</th>
                  <td>{artists[0].name}</td>
                </tr>
              </tbody>
            </table>
          
            </div>
          </div>
        </div>
    );
}

export default Detail;