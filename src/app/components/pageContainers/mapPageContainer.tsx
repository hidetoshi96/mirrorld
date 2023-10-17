"use client";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Tabs from "../tabs";
import Tags from "../tags";
import { useParams, useSearchParams } from "next/navigation";
import { Post, Location } from "@/types/post";

interface Props {
  initialPosts: Post[];
  initialTags: string[];
}

export default function MapPageContainer({ initialPosts, initialTags }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectPostId, setSelectPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [position, setPosition] = useState<Location | null>(null);
  const [markers, setMarkers] = useState<Markers>({});

  const mapContainer = useRef(null);

  const searchParams = useSearchParams();
  const locationParam = {
    latitude: searchParams.get("latitude"),
    longitude: searchParams.get("longitude"),
  };

  const handlePostUpdate = async () => {
    const res = await fetch("api/map", { method: "GET" });
    const data = await res.json();
    setTags(data.tags);
    setPosts(data.posts);
  };

  const createMarker = (
    post: {
      imageUrl: Post["imageUrl"];
      location: Location;
    },
    index: number,
  ) => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    const grandChild = document.createElement("div");

    child.className =
      "grid h-16 w-16 transform-gpu rotate-45 content-center justify-center rounded-full rounded-br-none bg-primary";
    grandChild.className = `marker h-14 w-14 -rotate-45 cursor-pointer rounded-full bg-cover bg-center bg-no-repeat`;
    grandChild.style.backgroundImage = `url(${post.imageUrl})`;
    parent.appendChild(child);
    child.appendChild(grandChild);

    const marker = new mapboxgl.Marker({
      element: parent,
    });
    marker
      .setLngLat([post.location.longitude, post.location.latitude])
      .addTo(map!)
      .getElement()
      .addEventListener("click", () => {
        setIsModalOpen(true);
        setSelectPostId(index);
      });
    return marker;
  };

  const filter = (tabIndex: number, tags: string[]) => {
    const tabFilteredPosts = posts.filter((post) => {
      if (tabIndex === 0) {
        return post.isMyPost;
      } else {
        return true;
      }
    });
    const tagFilteredPosts = tabFilteredPosts.filter((post) => {
      if (tags.length !== 0) {
        return post.tags.filter((tag: string) => tags.includes(tag)).length > 0;
      } else {
        return true;
      }
    });
    const filteredIds = tagFilteredPosts.map((post) => post.id);
    return filteredIds;
  };

  const handleMarkerUpdate = (tabIndex: number, tags: string[]) => {
    Object.values(markers).forEach((marker) => {
      marker.remove();
    });
    const filteredIds = filter(tabIndex, tags);
    let addMarkers: Markers = {};
    posts.forEach((post, index) => {
      if (!filteredIds.includes(post.id)) return;
      const marker = createMarker(post, index);
      addMarkers = { ...addMarkers, [post.id]: marker };
    });
    setMarkers((markers) => ({ ...markers, ...addMarkers }));
  };

  //set the initial position
  useEffect(() => {
    if (
      locationParam.latitude &&
      locationParam.longitude &&
      !isNaN(Number(locationParam.latitude)) &&
      !isNaN(Number(locationParam.longitude))
    ) {
      setPosition({
        latitude: Number(locationParam.latitude),
        longitude: Number(locationParam.longitude),
      });
    } else if ("geolocation" in navigator) {
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

  //create map
  useEffect(() => {
    if (position === null) {
      return;
    }
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hidetoshi/clmfrwauu019v01r94ej75q6m",
      center: [position.longitude, position.latitude],
      zoom: 15,
      pitch: 64.9,
      bearing: 0,
      antialias: true,
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
    setMap(map);
  }, [position]);

  //marker update
  useEffect(() => {
    if (map === null) {
      return;
    }
    handleMarkerUpdate(selectedTabIndex, selectedTags);
  }, [map, posts, selectedTabIndex, selectedTags]);

  return (
    <div className="relative h-full">
      <div style={{ display: "flex", height: "100%" }}>
        {position === null ? (
          <div className="flex h-full grow flex-col justify-center">
            <p className="text-center align-middle">
              数秒待っても地図が現れない場合は、
              <br />
              位置情報取得の権限を与えてください
            </p>
          </div>
        ) : (
          <div
            id="map"
            ref={mapContainer}
            style={{ flexGrow: "1", height: "100%" }}
          />
        )}
      </div>
      <div className="absolute inset-x-0 top-2 mx-3 flex  flex-col justify-center space-y-2">
        <Tabs
          selectedIndex={selectedTabIndex}
          setSelectedIndex={setSelectedTabIndex}
        />
        <Tags
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
      {Object.keys(posts).length != 0 && (
        <Modal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          post={posts[selectPostId]}
          postsUpdate={handlePostUpdate}
        ></Modal>
      )}
    </div>
  );
}
