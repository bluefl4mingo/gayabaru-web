import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { GeoJSON } from "leaflet";
import shp from "shpjs";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

// Define props interface
interface ShapefileProps {
  zipUrl: string;
}

const Shapefile: React.FC<ShapefileProps> = ({ zipUrl }) => {
  const map = useMap();

  useEffect(() => {
    const emptyFeatureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: []
    };

    const geo: GeoJSON = L.geoJSON(emptyFeatureCollection, {
      onEachFeature: (feature: Feature, layer) => {
        const out: string[] = [];
        if (feature.properties) {
          for (const key in feature.properties) {
            if (Object.prototype.hasOwnProperty.call(feature.properties, key)) {
              out.push(`${key}: ${feature.properties[key]}`);
            }
          }
          layer.bindPopup(out.join("<br />"));
        }
      }
    }).addTo(map);

    shp(zipUrl).then((data) => {
      geo.addData(data as FeatureCollection<Geometry, GeoJsonProperties>);
    });
  }, [map, zipUrl]);

  return null;
};

export default Shapefile;
