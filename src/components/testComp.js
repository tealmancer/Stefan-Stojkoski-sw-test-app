import React from "react";



class TestComp extends React.Component{
    constructor(){
        super();
        this.state={
            ownValue:0
        };
    }

    changeValue=(newValue)=>{
        this.setState({
            ownValue: newValue
        });
    };

    render(){
        return(
            <li>
                Now displaying the value {this.props.value}
                <button onClick={()=>{
                    let a = this.props.value
                    a.push(2);
                }}> add 2 if u can</button>
            </li>
            
        )
    }
}

export default TestComp;