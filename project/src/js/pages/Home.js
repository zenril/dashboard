import React from 'react';
import ReactDOM from 'react-dom';
import VTilt from 'vanilla-tilt';



import {
    Link
} from 'react-router-dom';

export default class Home extends React.Component
{
    componentDidMount()
    {
        VTilt.init(document.querySelector(".tilt"), {
            max: 25,
            speed: 400,
            reset : false
        });
    }

    constructor(props){
        super(props);
    }

    componentWillUnmount()
    {
    }

    render()
    {   
        let number = 10 + Math.floor(Math.random() * 40);
        console.log(number);
        var cirlces = Array.apply(null, {length: number}).map(Number.call, Number)

        return (
            <div className='homepage'>
                <div className="fixed-window">
                    <div className='tilt'>

                        {
                            cirlces.map((e,i) => {
                                    let x = (Math.random() * 100);
                                    let y = (Math.random() * 100);
                                    let r = (Math.random() * 100);
                                    let t = (Math.random() * 200);
                                    return <div key={i} style={{
                                        left:x + "%",
                                        top:y + "%",
                                        width:r + "px",
                                        height:r + "px",
                                        transform: "translateZ(" + t + "px)"
                                    }} className="circle"></div>
                            })
                        }
                        
                        <h1>aaron-m.co.nz</h1>
                    </div>
                </div>
            </div>
        );
    }
}