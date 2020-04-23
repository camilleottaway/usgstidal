import {Container} from 'unstated';
import axios from 'axios';
export class ManifestService extends Container {

    constructor(){
      super()
      this.requestData()
      this.requestGlobalData()
    }

    state = {
      data: {},
      spatialDomainsSites: [],
      pressure: [],
      pointLocationsSites: [],
      fetched: false,
      sites: {},
      currentSiteData: {},
      loadingCurrentSite: false,   

      date: '',  
    }


    async requestData(){
      if (!this.state.fetched){
        //Call API
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/manifest",
          { maxContentLength: 200000 }
        );

        // console.log({data: response.data.startDateTime})
    
        this.setState({ data: response.data})
        this.setState({ date: response.data.startDateTime })

        console.log("Pressure response: " + response.data.AreaWindPressure)
        console.log("Spatial response: " + response.data.SpatialDomains)
        console.log("Point Locations: " + response.data.PointLocations)

        // console.log("first spatial siteID: " + response.data.SpatialDomains[0])

        // console.log("tide predictions: " + response.data.PointLocations[0].siteDisplayName)
        console.log("Pressure Region: " + response.data.AreaWindPressure[0])

        this.setState({ spatialDomainsSites: response.data.SpatialDomains })
        this.setState({ pointLocationsSites: response.data.PointLocations })        
        this.setState({ areaWindPressureSites: response.data.AreaWindPressure })

        this.setState({fetched: true})
      }
    }

    async requestSiteData(siteID){
      this.setState({ loadingCurrentSite: true })
      const waveResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/getsite/" + siteID + "/Wave"
      );
      // console.log("Wave response:" + waveResponse)
      const windResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/getsite/" + siteID + "/Wind"
      );    
      const pressureResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/getsite/-1/areawindpressure"
      ).then(function(response) {
        // console.log(response);
      }).catch(function(error) { 
        // console.log(error);
      });    
      // console.log("Pressure Response data:" + pressureResponse.data) 
      this.setState({ currentSiteData: {wave: waveResponse.data, wind: windResponse.data}, loadingCurrentSite: false });
    }

    async requestGlobalData(){
      
      const pressureResponse = await axios.get(
        process.env.REACT_APP_API_URL +  "/getsite/-1/areawindpressure"
      );     
      console.log("Pressure Response data:" + pressureResponse.data);

      this.setState({pressure: pressureResponse.data} );     


    }

}