import React from 'react';
import "./WorkingImageCard.css";

const WorkingImageCard = (props) =>{
  return(
    <div className = 'ImageCard'>
        <img className ="WorkingImage"
             src ={props.image}
             alt ={props.alt}
        />
     </div>
  );
}

export default WorkingImageCard;
