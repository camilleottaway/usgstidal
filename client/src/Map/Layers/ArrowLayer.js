import {LineLayer} from 'deck.gl';

const scaler = 0.8;

const getRotatedLine = (source, target, negative)=>{

    const oy = (target[0] - source[0]) *scaler;
    const ox = (target[1] - source[1]) *scaler;

    var theta = .1;

    if (negative){
        theta = theta * -1;
    }

    var cs = Math.cos(theta);
    var sn = Math.sin(theta);

    var px = ox * cs - oy * sn; 
    var py = ox * sn + oy * cs;

    return [source[0] + py, source[1] + px]
}


const ArrowLayer = (props) =>{
    const outLayers = [
        new LineLayer({
            ...props,
          id: 'base ' + props.id,        
        }),
        new LineLayer({
            ...props,
            getSourcePosition: x=> {
                if (props.getSourcePosition(x) == null) {
                    return;
                }
                return getRotatedLine(props.getSourcePosition(x), props.getTargetPosition(x))
            },
          id: 'rightwing ' + props.id,        
        }),
        new LineLayer({
            ...props,
            getSourcePosition: x=> {
                if (props.getSourcePosition(x) == null) {
                    return;
                }
                return getRotatedLine(props.getSourcePosition(x), props.getTargetPosition(x), true)
            },            
            id: 'leftwing ' + props.id,        
        }),
    ]
    return outLayers
}

export default ArrowLayer;