import C3Chart from 'react-c3js'
import React from 'react'

/* Creates graphs for data category WIND

  Types of Graphs created:

    speed: speed and gusts
      displays either only predictions OR preds + observations
      TYPE parameter: SPEED
      data arguments: timeP, speedP, timeO, gusts, speedO

    direction: direction
      displays direction data
      TYPE parameter: DIR
      data arguments: timeP, dirP, timeO, dirO

  File cases:
    - a location has both PREDICTION and OBSERVATION data
    - a location has only PREDICTION data 
*/ 

/*
const PARAM_SPEED = "SPEED";
const PARAM_DIR   = "DIR";
*/

const COLOR_SPEED_PRED = '#1f77b4';
const COLOR_GUSTS_PRED = '#2ca02c';
const COLOR_SPEED_OBS  = '#ff7f0e';
const COLOR_DIR_PRED   = '';
const COLOR_DIR_OBS    = '';


var scale = 2.237;  // 1 m/s = 2.237 mph

export default async function buildGraph(dataPred, dataObs) {
  //console.log("dataPred: ", dataPred);
  let data = dataPred;
  let hasPOdata = false;

  if (dataObs.length){
      data.concat(dataObs);
      hasPOdata = true;
  }

  const expectedarraytype = [];
  for(let i =0; i <dataPred.length; i++){
      expectedarraytype.push([dataPred[i].time, dataPred[i].direction,dataPred[i].speed])
  }
  for(let i = 0; i < dataObs.length; i++){
      expectedarraytype.push([dataObs[i].time, dataObs[i].direction, dataObs[i].gusts, dataObs[i].speed])
  }

  return new Promise((resolve, reject) => 
  {
      let graphs;

      //if (type === PARAM_SPEED || type === PARAM_DIR) {
          graphs = doCallback(expectedarraytype, hasPOdata);
          resolve(graphs)
      //}
  });
}

function doCallback(data, hasPOdata){
  var spot = 0;
  var i;

  if (hasPOdata === true) {
    /*
      because pred and obs data is combined together, 
      get stop point between pred and obs data
      example: spot = 266, this is where the line is: "","time","twl"
      pred data is data[1... spot -1]
      obs data is data [spot+1...end]
    */

    for (i = 0; i < data.length; i++) {
      if (data[i].length === 4){
        spot = i;
        break;
      }
    }
  }
  else {
    spot = data.length;
  }

  // 1. PARSE PRED DATA
  // Every location will have pred data

  var timeP   = ["Predicted Time"];
  var dirP    = ["Predicted Direction"];
  var speedP  = ["Predicted Speed"];

  var str, justdate, justtime, strT, strZ, datepart, timepart, fulldt, d;
  strT = "T";
  strZ = "Z";

  for (i = 1; i < spot; i++) {

    // FORMAT: TIME, DIRECTION, SPEED

    // TIME_PRED
    if (data[i][0] === undefined) {
      timeP.push(null);
    }
    else {
      str = data[i][0];
      justdate = str.substring(0,10);
      justtime = str.substring(11);
      datepart = justdate.concat(strT);
      timepart = justtime.concat(strZ);
      fulldt   = datepart.concat(timepart);
      d        = new Date(fulldt);
      timeP.push(d);
    }

    // DIRECTION_PRED
    (data[i][1] === undefined) ?
      dirP.push(null)
      :
      dirP.push(parseFloat(Math.round(data[i][1] * 100) / 100).toFixed(1));
    

    // SPEED_PRED
    if(data[i][2] === undefined) {
      speedP.push(null);
    }
    else {
      var speedPinms      = parseFloat(Math.round(data[i][2]*100)/100).toFixed(2);
      var tempSpeedPinmph = speedPinms * scale;
      var speedPinmph     = parseFloat(Math.round(tempSpeedPinmph*100)/100).toFixed(2);
      speedP.push(speedPinmph);
    }
  }

  //  CASE: only pred data
  if (hasPOdata === false) {
    return doGraphs(timeP, dirP, speedP, null, null, null, null);
    /*
      return (
        <div>
          {doPGraph(timeP, dirP, speedP)}
        </div>
      );*/
  }

  // CASE: both pred and obs data
  else if (hasPOdata === true){

    var timeO   = ["Observed Time"];
    var dirO    = ["Observed Direction"];
    var gusts   = ["Gusts"];
    var speedO  = ["Observed Speed"];

    // 2. PARSE OBS DATA
    // Additional arguments: TIME_O, DIR_O, GUSTS, SPEED_O

    for (i = spot+1; i < data.length; i++) {

      // TIME_OBS: 2019-02-13 14:54:00+00:00
      if (data[i][0] === undefined) {
        timeO.push(null);
      }

      else {
        str = data[i][0].substring(0, 19);
        justdate = str.substring(0,10);
        justtime = str.substring(11);
        datepart = justdate.concat(strT);
        timepart = justtime.concat(strZ);
        fulldt   = datepart.concat(timepart);
        d        = new Date(fulldt);
        timeO.push(d);
      }

      // DIR_O
      (data[i][1] === undefined) ?
        dirO.push(null)
        :
        dirO.push(parseFloat(Math.round(data[i][1] * 100) / 100).toFixed(1));
      

      // GUSTS
      (data[i][2] === undefined) ?
        gusts.push(null)
        :
        gusts.push(parseFloat(Math.round(data[i][2] * 100) / 100).toFixed(2));
      

      // SPEED_O
      if(data[i][3] === undefined) {
        speedO.push(null);
      }
      else {
        var speedOinms      = parseFloat(Math.round(data[i][3]*100)/100).toFixed(2);
        var tempSpeedOinmph = speedOinms * scale;
        var speedOinmph     = parseFloat(Math.round(tempSpeedOinmph*100)/100).toFixed(2);
        speedO.push(speedOinmph);
      }
    }

    return doGraphs(timeP, dirP, speedP, timeO, dirO, gusts, speedO);
/*
    if (type === PARAM_SPEED) {
      return (
        <div>
          {doPOGraph(timeP, speedP, timeO, gusts, speedO)}
        </div>
      );
    }

   else if (type === PARAM_DIR) {
      return (
        <div>
          {doDirectionGraph(timeP, dirP, timeO, dirO)}
        </div>
      );
    }
    */
   }
}

function doGraphs(timeP, dirP, speedP, timeO, dirO, gusts, speedO) {
  return(
    <div>
      {timeO === null && dirO === null && gusts === null && speedO === null
      ? 
        doPGraph(timeP, speedP) 
        :
        doPOGraph(timeP, speedP, timeO, gusts, speedO)}
      {doDirectionGraph(timeP, dirP, timeO, dirO)}
    </div>
  )
}

function doPGraph(timeP, dirP, speedP) {

  var speedChart = {

    size: {
      height: 700
    },

    data: {

      xs: {
        'Predicted Speed':'Predicted Time'
      },
      xFormat: '%Y-%m-%d %H:%M:%S',
      columns: [
        timeP,
        speedP
      ]
    },

    colors: {
      'Predicted Speed': COLOR_SPEED_PRED
    },

    point: {
      show: false
    },

    legend: {
      position:'bottom'
    },

    axis: {

      x: {
        label:{
          text: 'Local Time',
          position:'outer-center'
        },

        type: 'timeseries',

        tick:{
          format: '%Y-%m-%d %H:%M:%S' ,
          count: 5,
          culling: {
            max: 10
          }
        }
      },

      y: {
        label: {
          text: 'Wind Speed [mph]',
          position: 'outer-middle'
        }
      }
    },

    tooltip: {
      format: {
        title: function (d) {
          return d;
        },

        value: function (value, ratio, id) {
          if (id === 'Predicted Speed' ) {
            return value + ' mph';
          }
        }
      }
    }
  };

  return <C3Chart {...speedChart} />
}

function doPOGraph(timeP, speedP, timeO, gusts, speedO) {
  var speedChart = {

    size: {
      height: 700
    },

    data: {

      xs: {
        'Predicted Speed':'Predicted Time',
        'Observed Speed' :'Observed Time',
        'Gusts'          :'Observed Time',
      },
      xFormat: '%Y-%m-%d %H:%M:%S',
      columns: [
        timeP,
        speedP,
        timeO,
        gusts,
        speedO
      ]
    },

    colors: {
      'Predicted Speed': COLOR_SPEED_PRED,
      'Observed Speed': COLOR_SPEED_OBS,
      'Gusts': COLOR_GUSTS_PRED 
    },

    point: {
      show: false
    },

    legend: {
      position:'bottom'
    },

    axis: {

      x: {
        label:{
          text: 'Local Time',
          position:'outer-center'
        },

        type: 'timeseries',

        tick:{
          format: '%Y-%m-%d %H:%M:%S' ,
          count: 5,
          culling: {
            max: 10
          }
        }
      },

      y: {
        label: {
          text: 'Wind Speed [mph]',
          position: 'outer-middle'
        }
      }
    },

    tooltip: {
      format: {
        title: function (d) {
          return d;
        },

        value: function (value, ratio, id) {
          if (id === 'Predicted Speed' || id === 'Observed Speed' || id === 'Gusts') {
            return value + ' mph';
          }
        }
      }
    }
  };

  return <C3Chart {...speedChart} />
}

function doDirectionGraph(timeP, dirP, timeO, dirO) {

  var dirChart = {

    size: {
      height: 700
    },

    data: {

      xs: {
        'Predicted Direction':'Predicted Time',
        'Observed Direction':'Observed Time',
      },

      xFormat: '%Y-%m-%d %H:%M:%S',
      columns: [
        timeP,
        dirP,
        timeO,
        dirO
      ]
    },

    colors: {
      'Predicted Direction': COLOR_DIR_PRED,
      'Observed Direction': COLOR_DIR_OBS
    },

    point: {
      show: false
    },

    legend: {
      position:'bottom'
    },

    axis: {

      x: {
        label:{
          text: 'Local Time',
          position:'outer-center'
        },

        type: 'timeseries',

        tick:{
          format: '%Y-%m-%d %H:%M:%S' ,
          count: 5,
          culling: {
            max: 10
          }
        }
      },

      y: {
        label: {
          text: 'Wind Direction [deg]',
          position: 'outer-middle'
        }
      }
    },

    tooltip: {
      format: {
        title: function (d) {
          return d;
        },

        value: function (value, ratio, id) {
          if (id === 'Predicted Direction' || id === 'Observed Direction') {
            return value + ' deg';
          }
        }
      }
    }
  };
  return <C3Chart {...dirChart}/>;
}