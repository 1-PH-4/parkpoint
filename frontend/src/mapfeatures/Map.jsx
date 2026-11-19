
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Oprava ikoniek značiek v React + Vite
const parkingIcon = new L.Icon({
    iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Jedno ukážkové parkovacie miesto v Košiciach
const parkingSpots = [
    {
        id: 1,
        name: "Parkovacie miesto 1",
        position: [48.718950849, 21.251254255],
        price: "2,50 € / hodina",
    },
];

export default function Map() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <MapContainer
                center={[48.718950849, 21.251254255]}
                zoom={14}
                style={{ width: "100%", height: "800px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {parkingSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        position={spot.position}
                        icon={parkingIcon}
                    >
                        <Popup>
                            <strong>{spot.name}</strong>
                            <br />
                            Cena: {spot.price}
                            <br />
                            <span>Ukážkové parkovacie miesto</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
