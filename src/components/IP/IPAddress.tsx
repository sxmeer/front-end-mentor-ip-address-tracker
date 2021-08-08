import React, { useState } from 'react';
import ArrowImage from '../../images/icon-arrow.svg';
import './IPAddress.scss';

let ipv4Regex: RegExp = /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/;
let ipv6Regex: RegExp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
let hostNameRegex: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

interface IProps {
  isLoading: boolean;
  fetchIP: (queryString: string) => void;
  ip: string;
  timezone: string;
  location: string;
  isp: string;
}


const IPAddress: React.FC<IProps> = (props) => {
  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onIPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setError(false);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.isLoading) {
      let inp: string = inputText.trim();
      let type: string = "";
      console.log(inp);
      if (ipv4Regex.test(inp)) {
        type = "ipAddress";
      } else if (ipv6Regex.test(inp)) {
        type = "ipAddress";
      } else if (hostNameRegex.test(inp)) {
        type = "domain";
      }
      if (type) {
        props.fetchIP(`&${type}=${inp}`);
      } else {
        setError(true);
      }
    } else {
      alert("IP address or domain is being located...");
    }
  }

  return <div className="IPAddress">
    <p className="IPAddress__header">IP Address Tracker</p>
    <form className="IPAddress__form" onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          className="IPAddress__input"
          value={inputText}
          onChange={onIPChange}
          placeholder="Search for any IP address or domain" />
        {error && <p className="IPAddress__error">Invalid IP Address or domain!</p>}
      </div>
      <button className="IPAddress__button">
        <img src={ArrowImage} alt="arrow" />
      </button>
    </form>
    <div className="IP__info">
      <div className="IP__info__box">
        <p className="IP__info__title">IP ADDRESS</p>
        <p className="IP__info__value">{props.ip}</p>
      </div>
      <div className="vr"></div>
      <div className="IP__info__box">
        <p className="IP__info__title">LOCATION</p>
        <p className="IP__info__value">{props.location}</p>
      </div>
      <div className="vr"></div>
      <div className="IP__info__box">
        <p className="IP__info__title">TIMEZONE</p>
        <p className="IP__info__value">{props.timezone}</p>
      </div>
      <div className="vr"></div>
      <div className="IP__info__box">
        <p className="IP__info__title">ISP</p>
        <p className="IP__info__value">{props.isp}</p>
      </div>
    </div>
  </div>
}

export default IPAddress;