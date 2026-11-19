
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const API_KEY = import.meta.env.VITE_MAPY_API_KEY;

function MapView() {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || !API_KEY) {
            console.error("Chýba Mapy.com API kľúč.");
            return;
        }

        const map = L.map(mapRef.current).setView(
            [48.1486, 17.1077],
            13
        );

        L.tileLayer(
            `https://api.mapy.com/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${API_KEY}`,
            {
                maxZoom: 19,
                attribution:
                    '<a href="https://api.mapy.com/copyright" target="_blank">© Seznam.cz a.s. and others</a>',
            }
        ).addTo(map);

        const logoControl = L.Control.extend({
            options: { position: "bottomleft" },

            onAdd() {
                const container = L.DomUtil.create("div");
                const link = L.DomUtil.create("a", "", container);

                link.href = "https://mapy.com/";
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                const logo = L.DomUtil.create("img", "", link);
                logo.src = "https://api.mapy.com/img/api/logo.svg";
                logo.alt = "Mapy.com";
                logo.style.height = "30px";

                return container;
            },
        });

        new logoControl().addTo(map);

        L.marker([48.1486, 17.1077])
            .addTo(map)
            .bindPopup("Parkpoint – ukážkové parkovacie miesto");

        return () => map.remove();
    }, []);

    return (
        <div className="map-container">
            <h2>Parkpoint</h2>
            <div ref={mapRef} className="parkpoint-map" />
        </div>
    );
}

export default MapView;
