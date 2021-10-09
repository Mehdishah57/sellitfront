import axios from 'axios';

const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/country`);
    return { data, error:null }
  } catch (error: any) {
    return { data:null, error }
  }
}

export default fetchCountries;