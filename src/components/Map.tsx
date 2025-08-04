"use client";

import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent: React.FC = () => {
  const position: [number, number] = [-5.659799, 122.764470]; 

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <b>Desa Gaya Baru</b><br />
          Kec. Lapandewa, Kab. Buton Selatan
        </Popup>
      </Marker>
      <Marker position={[-5.663317, 122.765050]}>
        <Popup>
          <b>Waburi Park</b><br />
          Taman wisata yang terletak di atas tebing dengan panorama laut biru jernih dan pasir putih.
        </Popup>
      </Marker>
      <Marker position={[-5.657323, 122.760889]}>
        <Popup>
          <b>Pantai Kacimbola</b><br />
          Pantai tersembunyi dengan pasir putih halus dan laut biru-hijau yang menawan.
        </Popup>
      </Marker>
      <Marker position={[-5.670609, 122.763687]}>
        <Popup>
          <b>Ceruk Konawe</b><br />
          Gua alam di tebing Pantai Konawe yang menyimpan jejak kehidupan prasejarah berupa lukisan purba seperti cap tangan, garis, dan bentuk menyerupai daun, serta sisa-sisa tulang dan tengkorak manusia.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
