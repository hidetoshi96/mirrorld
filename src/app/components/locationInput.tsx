import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { Location } from "@/types/post";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  location: {
    longitude: number | null;
    latitude: number | null;
  };
  onChange: (location: Location) => void;
}

export default function LocationInput({ onChange, location }: Props) {
  const [position, setPosition] = useState<Location | null>(null);
  const mapContainer = useRef(null);

  //set the initial position
  useEffect(() => {
    console.log("initial position");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        undefined,
        { enableHighAccuracy: true },
      );
    }
  }, []);

  //create map & marker
  useEffect(() => {
    if (position === null) {
      return;
    }
    console.log("create map");
    console.log("position", position);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hidetoshi/clmfrwauu019v01r94ej75q6m",
      center: { lng: position.longitude, lat: position.latitude },
      zoom: 15,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
    );

    const parent = document.createElement("div");
    const child = document.createElement("div");
    const grandChild = document.createElement("div");
    child.className =
      "grid h-8 w-8 transform-gpu rotate-45 content-center justify-center rounded-full rounded-br-none bg-primary";
    grandChild.className =
      "marker h-7 w-7 cursor-pointer rounded-full bg-white";
    child.appendChild(grandChild);
    parent.appendChild(child);
    const marker = new mapboxgl.Marker({
      element: parent,
      draggable: true,
    })
      .setLngLat({ lng: position.longitude, lat: position.latitude })
      .addTo(map);
    onChange({
      longitude: position.longitude,
      latitude: position.latitude,
    });
    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      onChange({ longitude: lngLat.lng, latitude: lngLat.lat });
    });
  }, [position]);

  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold text-secondary">位置情報</p>
      <div>
        {position === null ? (
          <div className="flex w-full justify-center">
            <p className="text-center align-middle">
              数秒待っても地図が現れない場合は、
              <br />
              位置情報取得の権限を与えてください
            </p>
          </div>
        ) : (
          <>
            <div className="aspect-platinum flex w-full">
              <div id="map" ref={mapContainer} className="h-full grow" />
            </div>
            <div className="grid grid-flow-col justify-stretch space-x-2.5">
              <div>
                <p className="text-base font-semibold text-secondary">経度</p>
                <input
                  name="longitude"
                  type="number"
                  step="0.00001"
                  className="form-input w-full rounded-md border border-gray text-center text-xs font-semibold text-secondary placeholder:text-gray"
                  required
                  disabled
                  value={location.longitude || 0}
                />
              </div>
              <div>
                <p className="text-base font-semibold text-secondary">緯度</p>
                <input
                  name="latitude"
                  type="number"
                  className="form-input w-full rounded-md border border-gray text-center text-xs font-semibold text-secondary placeholder:text-gray"
                  step="0.00001"
                  required
                  disabled
                  value={location.latitude || 0}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
