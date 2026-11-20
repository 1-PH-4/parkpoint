
import { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Súradnice Košíc
const INITIAL_POSITION = [48.718950849, 21.251254255];

// API kľúč nastav vo frontend/.env ako VITE_MAPY_API_KEY
const MAPY_API_KEY = import.meta.env.VITE_MAPY_API_KEY;

// Ikonka parkovacieho miesta
const parkingIcon = new L.Icon({
    iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Ikonka vyhľadanej adresy
const searchIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Parkovacie miesta
const parkingSpots = [
    {
        id: 1,
        name: "Parkovacie miesto 1",
        position: [48.718950849, 21.251254255],
        price: "2,50 € / hodina",
    },
];

// Mapy.com vracia názov miesta a doplňujúcu lokalitu.
function getAddress(place) {
    return [place.name, place.location]
        .filter(Boolean)
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(", ");
}

// Komponent na presunutie mapy
function MapMover({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 17, {
                duration: 1.2
            });
        }
    }, [position, map]);

    return null;
}

export default function SpotMap() {

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Automatické vyhľadávanie počas písania
    useEffect(() => {

        if (selectedPlace || inputValue.trim().length < 3) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(async () => {

            try {
                setLoading(true);
                setError("");

                if (!MAPY_API_KEY) {
                    throw new Error("Chýba Mapy.com API kľúč. Skontroluj frontend/.env.");
                }

                const params = new URLSearchParams({
                    apikey: MAPY_API_KEY,
                    query: inputValue.trim(),
                    limit: "5",
                    lang: "sk",
                    locality: "SK",
                    preferNear: `${INITIAL_POSITION[1]},${INITIAL_POSITION[0]}`
                });

                // Mapy.com Suggest API – našeptávanie počas písania.
                const response = await fetch(
                    `https://api.mapy.com/v1/suggest?${params}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    const errorText = await response.text();

                    console.error("Mapy.com API chyba:", {
                        status: response.status,
                        response: errorText
                    });

                    throw new Error(
                        `Mapy.com API chyba ${response.status}: ${errorText}`
                    );
                }

                const data = await response.json();

                // Mapy.com vracia výsledky v poli "items".
                const results = Array.isArray(data.items) ? data.items : [];

                setSuggestions(results);

                if (results.length === 0) {
                    setError("Nenašli sa žiadne adresy.");
                }

            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }

        }, 400);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };

    }, [inputValue, selectedPlace]);

    // Výber adresy
    const selectPlace = (place) => {

        // Mapy.com vracia súradnice v place.position (lon, lat).
        const position = [place.position.lat, place.position.lon];

        const address = getAddress(place);

        setInputValue(address);
        setSelectedPlace(place);
        setSelectedPosition(position);

        setSuggestions([]);
        setError("");
    };

    // Vymazanie adresy a vyhľadávacieho pinu
    const clearSearch = () => {
        setInputValue("");
        setSelectedPlace(null);
        setSelectedPosition(null);
        setSuggestions([]);
        setError("");
        setLoading(false);
    };

    // Enter vyberie prvý návrh
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && suggestions.length > 0) {
            selectPlace(suggestions[0]);
        }

        if (event.key === "Escape") {
            setSuggestions([]);
        }
    };

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }}>

            {/* Mapa na celú obrazovku */}
            <MapContainer
                center={INITIAL_POSITION}
                zoom={14}
                zoomControl={true}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="dark-map"
                />

                <MapMover position={selectedPosition} />

                {/* Pôvodné parkovacie miesta */}
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
                            Ukážkové parkovacie miesto
                        </Popup>
                    </Marker>
                ))}

                {/* Vyhľadaná adresa */}
                {selectedPosition && (
                    <Marker
                        position={selectedPosition}
                        icon={searchIcon}
                    >
                        <Popup>
                            <strong>Vyhľadané miesto</strong>
                            <br />
                            {inputValue}
                        </Popup>
                    </Marker>
                )}

            </MapContainer>

            {/* Vyhľadávací panel */}
            <div style={{
                position: "absolute",
                top: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(600px, calc(100% - 32px))",
                zIndex: 1000,
                fontFamily: "Arial, sans-serif"
            }}>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    padding: "5px 8px",
                    gap: "8px"
                }}>

                    {/* Ikonka lupy */}
                    <span style={{
                        fontSize: "21px",
                        paddingLeft: "8px",
                        color: "#666"
                    }}>
                        <icon name="search" />
                    </span>

                    {/* Vstupné pole */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setSelectedPlace(null);
                            setSelectedPosition(null);
                            setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Vyhľadať miesto alebo adresu..."
                        style={{
                            flex: 1,
                            minWidth: 0,
                            padding: "13px 5px",
                            border: "none",
                            outline: "none",
                            fontSize: "15px",
                            background: "transparent",
                            color: "#333"
                        }}
                    />

                    {/* Načítavanie */}
                    {loading && (
                        <span style={{
                            fontSize: "12px",
                            color: "#777"
                        }}>
                            Hľadám...
                        </span>
                    )}

                    {/* Vymazanie */}
                    {inputValue && (
                        <button
                            onClick={clearSearch}
                            title="Vymazať vyhľadávanie"
                            style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "22px",
                                color: "#777",
                                cursor: "pointer",
                                padding: "5px 10px"
                            }}
                        >
                            ×
                        </button>
                    )}

                </div>

                {/* Zoznam návrhov */}
                {suggestions.length > 0 && (
                    <div style={{
                        background: "white",
                        marginTop: "5px",
                        borderRadius: "10px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
                        overflow: "hidden"
                    }}>

                        {suggestions.map((place, index) => (
                            <button
                                key={`${place.name}-${place.position?.lon}-${place.position?.lat}-${index}`}
                                onClick={() => selectPlace(place)}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "14px",
                                    padding: "13px 16px",
                                    border: "none",
                                    borderBottom: index !== suggestions.length - 1
                                        ? "1px solid #eee"
                                        : "none",
                                    background: "white",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    color: "#333"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f3f6fa";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "white";
                                }}
                            >

                                <span style={{
                                    fontSize: "19px",
                                    color: "#777"
                                }}>
                                    <icon name="map-pin" />
                                </span>

                                <span style={{
                                    fontSize: "14px",
                                    lineHeight: "1.5"
                                }}>
                                    {getAddress(place)}
                                </span>

                            </button>
                        ))}

                    </div>
                )}

                {/* Informácie o vyhľadávaní */}
                {error && inputValue.length >= 3 && (
                    <div style={{
                        background: "white",
                        marginTop: "5px",
                        padding: "14px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        fontSize: "13px",
                        color: "#666"
                    }}>
                        {error}
                    </div>
                )}

                {!selectedPlace && inputValue.length > 0 &&
                    inputValue.length < 3 && (
                        <div style={{
                            background: "white",
                            marginTop: "5px",
                            padding: "12px",
                            borderRadius: "10px",
                            fontSize: "13px",
                            color: "#777"
                        }}>
                            Napíš aspoň 3 znaky.
                        </div>
                    )}

            </div>

        </div>
    );
}
