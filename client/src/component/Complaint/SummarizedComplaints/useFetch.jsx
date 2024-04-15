import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import API_URL from '@/url';

const fetchDjango = (endpoint) => {
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  
  return axios.get(`${API_URL}/${endpoint}`, config);
};

const useFetch = (endpoint, fetchOnLoad = false) => {

  const [endPoint, setEndPoint]=useState(endpoint)
  const [fetch, setFetch] = useState(fetchOnLoad);
  
  const queryInfo = useQuery(endPoint, () => fetchDjango(endPoint), {
    enabled: fetch,
  });

  const changeEndPoint=(end)=>{
    setEndPoint(end)
  }

  const fetchNow = () => {
    setFetch(true);
  };

  const resetFetch=()=>{
    setFetch(false)
  }

  return { ...queryInfo, fetchNow, fetch, resetFetch, changeEndPoint };
};

export default useFetch;
