import React from "react";
import "../productStyles.css";


export default class ProductAttributes extends React.Component {
  render() {
    return (
      <div>
        {this.props.attributes.map(({ name, items }) => {
          if (name === "Color") {
            return (
              <div key={name}>
                <div className="attributeName">
                  {name}:
                </div>
                <ul className="attributeList">
                  {items.map(({ value }, i) => {
                    let show = "";
                    if (this.props.state.find((e) => e.name === name && e.value === value)) show = "show";
                    return (
                      <div key={i} className={`selectedButton ${show}`}>
                        <button onClick={() => {(this.props.setstate) && this.props.setstate({ name, value })}}
                          className="attributeColor" style={{ backgroundColor: `${value}` }}
                          key={value}
                        ></button>
                      </div>
                    );
                  })}
                </ul  >
              </div>
            );
          } else {
            return (
              <div key={name}>
                <div className="attributeName">
                  {name}:{" "}
                </div>
                <ul className="attributeList">
                  {items.map(({ value }) => {
                    let show = "";
                    if (this.props.state.find((e) => e.name === name && e.value === value)) show = "show";
                    return <button onClick={() => { (this.props.setstate) && this.props.setstate({ name, value })  }} className={`attributeElement ${show}`} key={value}>{value}</button>;
                  })}
                </ul>
              </div>
            );
          }
        })}
      </div>
    );
  }
}