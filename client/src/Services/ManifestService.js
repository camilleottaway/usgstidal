import {Container} from 'unstated';
import axios from 'axios';
export class ManifestService extends Container {

    constructor(){
      super()
      this.requestData()
    }

    state = {
      data: {},
      spatialDomainsSites: [],
      areaWindPressureSites: [],
      pointLocationsSites: [],
      fetched: false,
      sites: {},
      currentSiteData: {},
      loadingCurrentSite: false,      
    }


    async requestData(){
      if (!this.state.fetched){
        //Call API
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/manifest",
          { maxContentLength: 200000 }
        );
<<<<<<< Updated upstream
        this.setState({data: response.data})
=======

        // console.log({data: response.data.startDateTime})
    
        this.setState({ data: response.data})
        this.setState({ date: response.data.startDateTime })

        console.log(response.data.AreaWindPressure)
        console.log(response.data.SpatialDomains)
        console.log(response.data.PointLocations)

>>>>>>> Stashed changes
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
      const windResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/getsite/" + siteID + "/Wind"
      );    
      const pressureResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/getsite/Global Data" + "/Pressure"
      );    
      this.setState({ currentSiteData: {wave: waveResponse.data, wind: windResponse.data, pressure: pressureResponse.data}, loadingCurrentSite: false });
    }

    async requestGlobalData(){
      this.setState({ loadingCurrentSite: true })
      const pressureResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/Pressure"
      );     
      this.setState({ currentSiteData: {pressure: pressureResponse.data}, loadingCurrentSite: false });
    }

}