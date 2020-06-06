import axios from 'axios';

export const requestPointLocationData = async (siteID, type) =>{    
    console.log("SiteID = " + siteID);
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/getsite/" + siteID + "/" + type
    );    
    console.log(response);
    return response.data;
}

export const requestAreaWindPressureData = async (type) =>{
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/getsite/-1/areawindpressure/"
  );
  return response.data;
}