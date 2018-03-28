import React from 'react';
import ReactDOM from 'react-dom';

class world
{
    constructor(){
        this.state = {
            x : 0,
            y : 0
        };
    } 

    _tick(state){

    }

    tick(t){
        this._tick = t;
    }

    ticker(){
        let self = this;
        setTimeout(() => {
            self._tick(this.state);
            self.ticker();
        }, 1000 / 24 )
    }
}

const _world = new world();

export default _world;