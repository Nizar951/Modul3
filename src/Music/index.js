import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

const Music = ({url, nama}) => {
    return <div className="card">
                <img src={url} className="card-img-top" alt="cover  " />
            <div className="card-body">
                
                <h5 className="card-title">Artist : {nama}</h5>
            </div>
            <button type="button" class="btn btn-success">Success</button>
        </div>
}

export default Music;