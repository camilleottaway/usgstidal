import C3Chart from 'react-c3js'
import React from 'react'

/* Creates graphs for data category WATER

    Types of Graphs created:

        twl: Total water level 
            displays either only predictions OR preds + observerations
            TYPE parameter: TWL
            data arguments: timeP, tideP, twlP, timeO, tideO, twlO

        ntr: non tidal residual (storm surge) 
            displays ntr data
            TYPE parameter: NTR
            data arguments: timeP, ntr

    File cases:
        - a location has both PREDICTION and OBSERVATION data
        - a location has only PREDICTION data
*/

/*
const PARAM_TWL = "TWL";
const PARAM_NTR = "NTR";
*/

const COLOR_TWL_PRED  = '#1f77b4';
const COLOR_TIDE_PRED = '#ff7f0e';
const COLOR_TWL_OBS   = '#2ca02c';
const COLOR_NTR       = '';

export default async function buildGraph(dataPred, dataObs) {
    let data = dataPred;
    let hasPOdata = false;

    if (dataObs.length){
        data.concat(dataObs);
        hasPOdata = true;
    }

    const expectedarraytype = [];
    for(let i =0; i <dataPred.length; i++){
        expectedarraytype.push([dataPred[i].time, dataPred[i].tidePred,dataPred[i].ntr, dataPred[i].twlPred])
    }
    for(let i = 0; i < dataObs.length; i++){
        expectedarraytype.push([i, dataObs[i].time, dataObs[i].twlObs])
    }

    return new Promise((resolve, reject) => 
    {
        let graphs;
 
        //if (type === PARAM_TWL || type === PARAM_NTR) {
            graphs = doCallback(expectedarraytype, hasPOdata);
            resolve(graphs)
        //}
    });
}

function doCallback(data, hasPOdata) {

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
            if (data[i][3] === null || data[i][3] === undefined) {
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

    var timeP = ["Time Predicted"];
    var tideP = ["Predicted Tide Level"];
    var ntr   = ["Non-Tidal Residual"];
    var twlP  = ["Predicted Total Water Level"];

    var str, justdate, justtime, strT, strZ, datepart, timepart, fulldt, d;
    strT = "T";
    strZ = "Z";

    for (i = 1; i < spot; i++) {

        // FORMAT: TIME, TIDE_PRED, NTR, TWL_PRED

        // TIME_PRED
        if (data[i][0] === undefined) {
            timeP.push(null);
        }
        else {
            str      = data[i][0];
            justdate = str.substring(0, 10);
            justtime = str.substring(11);
            datepart = justdate.concat(strT);
            timepart = justtime.concat(strZ);
            fulldt   = datepart.concat(timepart);
            d        = new Date(fulldt);
            timeP.push(d);
        }

        // TIDE_PRED
      (data[i][1] === undefined) ?
        tideP.push(null)
        :
        tideP.push(parseFloat(Math.round(data[i][1] * 100) / 100).toFixed(2));
        

      // NTR
      (data[i][2] === undefined) ?
        ntr.push(null)
        :
        ntr.push(parseFloat(Math.round(data[i][2] * 100) / 100).toFixed(2));
      

        // TWL_PRED
      (data[i][3] === undefined) ?
        twlP.push(null)
        :
        twlP.push(parseFloat(Math.round(data[i][3] * 100) / 100).toFixed(2));
        
    }


    // CASE: create an NTR graph
    /*
    if (type === PARAM_NTR) {
        return (
            <div>
                {doNTRGraph(timeP, ntr)}
            </div>
        );
    }
    */

    // CASE: create a TWL graph
    //else if (type === PARAM_TWL) {
        
    // CASE: only pred data
    if (hasPOdata === false) {  
        return doGraphs(timeP, tideP, ntr, twlP, null, null);          
          
        /*
        return (
            <div>
                {doPGraph(timeP, twlP, tideP)}
            </div>
        );
        */
    }

    // CASE: both pred and obs data
    else if (hasPOdata === true) {
        var timeO  = ["Time Observed"];
        var twlO   = ["Observed Total Water Level"];

        // 2. PARSE OBS DATA
        // Additional arguments: TIME_OBS, TWL_OBS

        for (i = spot + 1; i < data.length; i++) {

            // TIME_OBS: 2018-11-19 00:00:00
            if (data[i][1] === undefined) {
                timeO.push(null);
            }
            else {
                str      = data[i][1];
                justdate = str.substring(0, 10);
                justtime = str.substring(11);
                datepart = justdate.concat(strT);
                timepart = justtime.concat(strZ);
                fulldt   = datepart.concat(timepart);
                d        = new Date(fulldt);
                timeO.push(d);
            }

            // TWL_OBS
            {(data[i][2] === undefined) ?
                twlO.push(null)
                :
                twlO.push(parseFloat(Math.round(data[i][2] * 100) / 100).toFixed(2))
            }
        }

        return doGraphs(timeP, tideP, ntr, twlP, timeO, twlO);

        /*
        return (
            <div>
                {doPOGraph(timeP, twlP, tideP, timeO, twlO)}
            </div>
        );
        */
    }
    //} 
}

function doGraphs(timeP, tideP, ntr, twlP, timeO, twlO) {
    return (
        <div>
            {timeO === null && twlO === null ? 
                doPGraph(timeP, twlP, tideP)
                : 
                doPOGraph(timeP, twlP, tideP, timeO, twlO)
            }
            {doNTRGraph(timeP, ntr)}
        </div>
    )
}

function doPGraph(timeP, twlP, tideP) {
    var twlChart = {
        size: {
            height: 700
        },

        data: {

            xs: {
                'Predicted Total Water Level': 'Time Predicted',
                'Predicted Tide Level': 'Time Predicted'
            },
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                timeP,
                twlP,
                tideP
            ]
        },

        colors: {
            'Predicted Total Water Level': COLOR_TWL_PRED,
            'Predicted Tide Level': COLOR_TIDE_PRED
        },

        point: {
            show: false
        },

        legend: {
            position: 'bottom'
        },

        axis: {

            x: {
                label: {
                    text: 'Local Time',
                    position: 'outer-center'
                },

                type: 'timeseries',

                tick: {
                    format: '%Y-%m-%d %H:%M:%S',
                    count: 5,
                    culling: {
                        max: 10
                    }
                }
            },

            y: {
                label: {
                    text: 'Total Water Level [ft/MLLW]',
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
                    if (id === 'Predicted Total Water Level' || id === 'Predicted Tide Level') {
                        return value + ' ft/MLLW';
                    }
                }
            }
        }
    };

    return <C3Chart {...twlChart} />
}

function doPOGraph(timeP, twlP, tideP, timeO, twlO) {

    var twlChart = {
        size: {
            height: 700
        },

        data: {

            xs: {
                'Predicted Total Water Level': 'Time Predicted',
                'Predicted Tide Level': 'Time Predicted',
                'Observed Total Water Level': 'Time Observed',
            },
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                timeP,
                twlP,
                tideP,
                timeO,
                twlO
            ]
        },

        colors: {
            'Predicted Total Water Level': COLOR_TWL_PRED,
            'Predicted Tide Level': COLOR_TIDE_PRED,
            'Observed Total Water Level': COLOR_TWL_OBS
        },

        point: {
            show: false
        },

        legend: {
            position: 'bottom'
        },

        axis: {

            x: {
                label: {
                    text: 'Local Time',
                    position: 'outer-center'
                },

                type: 'timeseries',

                tick: {
                    format: '%Y-%m-%d %H:%M:%S',
                    count: 5,
                    culling: {
                        max: 10
                    }
                }
            },

            y: {
                label: {
                    text: 'Total Water Level [ft/MLLW]',
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
                    if (id === 'Predicted Total Water Level' || id === 'Predicted Tide Level' || id === 'Observed Total Water Level') {
                        return value + ' ft/MLLW';
                    }
                }
            }
        }
    };

    return <C3Chart {...twlChart} />
}

function doNTRGraph(timeP, ntr) {

    var ntrChart = {

        size: {
            height: 700
        },

        data: {

            xs: {
                'Non-Tidal Residual': 'Time Predicted'
            },

            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                timeP,
                ntr
            ]
        },

        colors: {
            'Non-Tidal Residual': COLOR_NTR
        },

        point: {
            show: false
        },

        legend: {
            position: 'bottom'
        },

        axis: {

            x: {
                label: {
                    text: 'Local Time',
                    position: 'outer-center'
                },

                type: 'timeseries',

                tick: {
                    format: '%Y-%m-%d %H:%M:%S',
                    count: 5,
                    culling: {
                        max: 10
                    }
                }
            },

            y: {
                label: {
                    text: 'Non-Tidal Residual [ft]',
                    position: 'outer-middle'
                }
            }
        },
        grid: {
            y: {
                lines: [
                    { value: 0 }
                ]
            }
        },
        tooltip: {
            format: {
                title: function (d) {
                    return d;
                },

                value: function (value, ratio, id) {
                    if (id === 'Non-Tidal Residual') {
                        return value + ' ft';
                    }
                }
            }
        }
    };

    return <C3Chart {...ntrChart} />;
}

