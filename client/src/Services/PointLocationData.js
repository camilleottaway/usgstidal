import axios from 'axios';

export const requestPointLocationData = async (siteID, type) =>{    
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/getsite/" + siteID + "/" + type
    );    
    return response.data;
}

export const requestAreaWindPressureData = async (type) =>{
  const response = await axios.get(
    process.env.REACT_APP_API_URL + "/getsite/Global Data/" + type
  );
  return response.data;
}