import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
// import VTilt from 'vanilla-tilt';
// import world from '../world.js';

// import world from '../world.js';
import {Gate, OR_Gate,XOR_Gate, Pulse, MEM, AND_Gate, NOT_Gate, Output} from '../model/Gate'

import {
    Link
} from 'react-router-dom';
 
export default class Home extends React.Component
{


    constructor(props){
        super(props);
        window.thing2 = false;

        var io = new OR_Gate();
        io.color = "green";

        io.pullState(function(){ return window.input; });
        var or = io.OR().Pulse().OR().OR().OR().OR().OR().OR().MEM();
        //io.join('and');
        or.color = "black";
    }


    componentDidMount()
    {
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-100))
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(40))
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .on("tick", ticked);

        var link = svg.selectAll(".link"),
            node = svg.selectAll(".node");

       // d3.json("graph.json", function(error, graph) {
        //if (error) throw error;
        var graph = {
            "nodes": [],
            "links": []
        };

        var g = Gate.gates();
        for (let i = 0; i < g.length; i++) {
            var e = g[i];

            graph.nodes.push({
                id : e.uuid,
                color: e.color? e.color : "white",
                model : e
            });

            if(e.connections.parents && e.connections.parents.length){
                e.connections.parents.forEach(element => {
                    graph.links.push({
                        source: e.uuid, target: element.uuid
                    });
                });
            }
        }


        simulation.nodes(graph.nodes);
        simulation.force("link").links(graph.links);

        link = link
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link");

        node = node
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", function(d){  return d.model.state? 20 : 6; })
            .style("fill", function(d) { return d.model.state? "red" : d.color; });


        function ticked() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d){  return d.model.state? 10 : 6; })
                .style("fill", function(d) {
                    return d.model.state? "red" : d.color;
                });
        }

        Gate.tick(ticked);

    }

    render()
    {
        return (
            <div className='homepage-x'>ssss
                <svg width="1960" height="1500" className='mount'></svg>
            </div>
        );
    }
}