import React from "react";
import "./productGallery.css";

export default class ProductGallery extends React.Component{
    constructor(props){
        super(props);     
        this.state = {index: 0};
      }

      setImage = (newIndex) => {
        this.setState({
          index: newIndex
        });
      };

    render(){
      //Depending on the imageDisplayed prop, the component will either render as a list of images with a larger displayed image,
      // or as a single image container with buttons that cycle through available images,
      // to be used in the product page and cart page respectively.
      if( this.props.displayType === ""){
        return(
          <div className ="productGallery">
            <div className="imageList">
            {this.props.gallery.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt="img"
                  onClick={()=>this.setImage(index)}
                />
              );
            })}
            </div>
            <div className="imageDisplayed">
              <img src={`${this.props.gallery[this.state.index]}`} alt={"img"} />
            </div>
          </div>
        ) 
      }else {
      return(
          
          <div className={`imageDisplayed ${this.props.displayType}`}>
            <img src={`${this.props.gallery[this.state.index]}`} alt={"img"} />
            { (this.props.gallery.length > 1) ? 
            <div className = "imageDisplayedSelector">
              <button onClick={()=>this.setState(({index: (this.state.index === 0? this.props.gallery.length - 1 : this.state.index - 1)}))} className = "imageDisplayedButton">&lt;</button>
              <button onClick={()=>this.setState(({index: (this.state.index === this.props.gallery.length - 1? 0 : this.state.index + 1)}))} className = "imageDisplayedButton">&gt;</button>
            </div>
            
            :
             <></>
            }
          </div>
          
       
      )
    }
  }
}