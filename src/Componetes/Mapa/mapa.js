import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import imagem from './placeholder.png';
import "leaflet/dist/leaflet.css";
import "./../Mapa/mapa.css";

function Mapa() {
  const position = [-32.0350, -52.0986];
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const customIcon = new Icon({
    iconUrl: imagem,
    iconSize: [38, 38]
  });

  const createCustomClusterIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  const handleAddMarker = (place, latlng) => {
    const newMarker = {
      id: Date.now(),
      position: latlng,
      popUp: place
    };
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

  const handleRemoveMarker = (id) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
    setSelectedMarker(null);
  };

  const openPopup = (marker) => {
    setSelectedMarker(marker);
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="central">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler handleAddMarker={handleAddMarker} />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position} icon={customIcon} eventHandlers={{ click: () => openPopup(marker) }}>
              {selectedMarker && selectedMarker.id === marker.id && (
                <Popup position={marker.position} onClose={closePopup}>
                  {marker.popUp}
                </Popup>
              )}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {selectedMarker && (
        <div className="popup-buttons">
          <button onClick={() => handleRemoveMarker(selectedMarker.id)}>Excluir Marcador</button>
        </div>
      )}
    </div>
  );
}

function MapClickHandler({ handleAddMarker }) {
  // eslint-disable-next-line
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const placeName = data.display_name;
        handleAddMarker(placeName, e.latlng);
      } catch (error) {
        console.error("Erro ao buscar nome do lugar:", error);
        handleAddMarker("Marcador", e.latlng);
      }
    }
  });

  return null;
}

export default Mapa;
