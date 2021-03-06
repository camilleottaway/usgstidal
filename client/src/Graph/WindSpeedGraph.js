import React, {Component} from 'react'
import Wind from './Wind';
import 'c3/c3.css';
import {requestPointLocationData} from '../Services/PointLocationData';
const PARAM_SPEED = "SPEED";

export class WindSpeedGraph extends Component {

    state = {
        loaded :false
    }
    graph;

    async componentWillMount(){
        const pred = await requestPointLocationData(this.props.site.id, "WindPred")
        const obs = await requestPointLocationData(this.props.site.id, "WindObs")
        this.graph = await Wind(PARAM_SPEED, pred, obs);

        this.setState({loaded:true});
    }

    render() {
        return (
            <div>
            {this.state.loaded?this.graph:<div>Loading </div> }
            </div>
        );
    }
}
