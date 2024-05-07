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

  const icone = new Icon({
    iconUrl: imagem,
    iconSize: [38, 38]
  });

  const criar_icone = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  const adicionar_marcador = (place, latlng) => {
    const newMarker = {
      id: Date.now(),
      position: latlng,
      popUp: place
    };
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

  const remover_icone = (id) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
    setSelectedMarker(null);
  };

  const abrir_popup = (marker) => {
    setSelectedMarker(marker);
  };

  const fechar_popup = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="central">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler adicionar_marcador={adicionar_marcador} />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={criar_icone}>
          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position} icon={icone} eventHandlers={{ click: () => abrir_popup(marker) }}>
              {selectedMarker && selectedMarker.id === marker.id && (
                <Popup position={marker.position} onClose={fechar_popup}>
                  {marker.popUp}
                </Popup>
              )}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {selectedMarker && (
        <div className="popup-buttons">
          <button onClick={() => remover_icone(selectedMarker.id)}>Excluir Marcador</button>
        </div>
      )}
    </div>
  );
}

function MapClickHandler({ adicionar_marcador }) {
  // eslint-disable-next-line
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const placeName = data.display_name;
        adicionar_marcador(placeName, e.latlng);
      } catch (error) {
        console.error("Erro ao buscar nome do lugar:", error);
        adicionar_marcador("Marcador", e.latlng);
      }
    }
  });

  return null;
}

export default Mapa;
