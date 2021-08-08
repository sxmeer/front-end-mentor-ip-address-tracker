import React from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import './Leaflet.scss';
import L, { LatLngExpression } from 'leaflet';
import icon from '../../../images/icon-location.svg';

interface IProps {
  lat: number;
  lng: number;
}

const iconLoc = new L.Icon({
  iconUrl: icon,
  iconSize: [30, 41],
  iconAnchor: [15, 41],
});

function ChangeView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


const Leaflet: React.FC<IProps> = (props) => {
  return <div className="Leaflet">
    <MapContainer
      center={[props.lat, props.lng]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}>
      <ChangeView center={[props.lat, props.lng]} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.lat, props.lng]} icon={iconLoc} />
    </MapContainer>
  </div>
};

export default Leaflet;