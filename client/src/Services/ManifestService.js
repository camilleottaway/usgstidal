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
    
        this.setState({data: response.data})
        this.setState({ date: response.data.startDateTime })
        this.setState({ spatialDomainsSites: response.data.SpatialDomains })
        this.setState({ pointLocationsSites: response.data.PointLocations })
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
      this.setState({ currentSiteData: {wave: waveResponse.data, wind: windResponse.data}, loadingCurrentSite: false });
    }

}