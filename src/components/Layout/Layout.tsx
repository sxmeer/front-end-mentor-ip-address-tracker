import React from 'react';
import './Layout.scss';
import BackgroundImage from '../../images/pattern-bg.png';
import Leaflet from './Leaflet/Leaflet';
import IPAddress from '../IP/IPAddress';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

interface apiData {
  ip: string;
  location: {
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  },
  isp: string;
}

interface IState {
  isLoading: boolean;
  error: null | { message: string };
  apiData: apiData;
}

const Layout: React.FC<{}> = (props) => {
  const [stateData, setStateData] = useState<IState>({
    isLoading: false,
    error: null,
    apiData: {
      ip: "",
      location: {
        region: "",
        city: "",
        lat: 51.505,
        lng: -0.09,
        postalCode: "",
        timezone: "",
      },
      isp: ""
    }
  });

  const fetchIP = (queryString: string) => {
    if (!stateData.isLoading) {
      setStateData((prevState) => {
        let preApiData = { ...prevState.apiData };
        preApiData.ip = "";
        preApiData.isp = "";
        let prevLocation = { ...prevState.apiData.location };
        prevLocation.region = "";
        prevLocation.timezone = "";
        prevLocation.postalCode = "";
        prevLocation.city = "";
        preApiData.location = prevLocation;
        return { isLoading: true, error: null, apiData: preApiData }
      });
      axios(`https://geo.ipify.org/api/v1?apiKey=at_LDa12CEI2Nr5BpGP32aKuUtR0nvXU${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        let data: apiData = response.data;
        setStateData((prevState) => ({ ...prevState, isLoading: false, apiData: data, error: null }));
      }).catch((error: { message: string }) => {
        setStateData((prevState) => {
          let preApiData = { ...prevState.apiData };
          preApiData.ip = "";
          preApiData.isp = "";
          let prevLocation = { ...prevState.apiData.location };
          prevLocation.region = "";
          prevLocation.timezone = "";
          prevLocation.postalCode = "";
          prevLocation.city = "";
          preApiData.location = prevLocation;
          return { isLoading: false, error: error, apiData: preApiData };
        });
      })
    }
  }

  useEffect(() => {
    fetchIP("");
    // eslint-disable-next-line
  }, []);

  return <div className="Layout">
    <div className="Layout__container">
      <img
        className="Layout__background__image"
        src={BackgroundImage}
        alt="background-texture" />
      <div className="Layout__background__leaflet">
        <Leaflet lat={stateData.apiData.location.lat} lng={stateData.apiData.location.lng} />
      </div>
    </div>
    <IPAddress
      fetchIP={fetchIP}
      isLoading={stateData.isLoading}
      ip={stateData.error ? "Not Available" : stateData.apiData.ip ? stateData.apiData.ip : "loading..."}
      timezone={stateData.error ? "Not Available" : stateData.apiData.location.timezone ? stateData.apiData.location.timezone : "loading..."}
      isp={stateData.error ? "Not Available" : stateData.apiData.isp ? stateData.apiData.isp : "loading..."}
      location={stateData.error ? "Not Available" : stateData.apiData.location.city ?
        `${stateData.apiData.location.city}, ${stateData.apiData.location.region} ${stateData.apiData.location.postalCode}`
        : "loading..."}
    />
  </div>
};

export default Layout;