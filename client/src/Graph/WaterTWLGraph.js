import React, {Component} from 'react'
import Water from './Water';
import 'c3/c3.css';
import {requestPointLocationData} from '../Services/PointLocationData';
const PARAM_TWL = "TWL";

export class WaterTWLGraph extends Component {

    state = {
        loaded :false
    }
    graph;

    async componentWillMount(){        
        const pred = await requestPointLocationData(this.props.site.id, "TidePred")
        const obs = await requestPointLocationData(this.props.site.id, "TideObs")
        this.graph = await Water(PARAM_TWL, pred, obs);
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
