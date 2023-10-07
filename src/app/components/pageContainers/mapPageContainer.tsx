"use client";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Tabs from "../tabs";
import Tags from "../tags";

export default function MapPageContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectPostId, setSelectPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<Markers>({});

  const mapContainer = useRef(null);

  const handlePostUpdate = async () => {
    const res = await fetch("api/map", { method: "GET" });
    const json = await res.json();
    console.log("json", json);
    setPosts(json.posts);
    setTags(json.tags);
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

  const handleTabUpdate = (tabIndex: number) => {
    handleMarkerUpdate(tabIndex, selectedTags);
  };

  const handleTagsUpdate = (tags: string[]) => {
    handleMarkerUpdate(selectedTabIndex, tags);
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
    setSelectedTags(tags);
    setSelectedTabIndex(tabIndex);
    setMarkers((markers) => ({ ...markers, ...addMarkers }));
  };
  //marker update
  useEffect(() => {
    handleMarkerUpdate(selectedTabIndex, selectedTags);
  }, [posts]);

  //create map
  useEffect(() => {
    handlePostUpdate();

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hidetoshi/clmfrwauu019v01r94ej75q6m",
      center: [135.15895579845315, 34.25042459696373],
      zoom: 15,
      pitch: 64.9,
      bearing: 0,
      antialias: true,
    });
    setMap(map);

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
    );
  }, []);

  return (
    <div className="relative h-full">
      <div style={{ display: "flex", height: "100%" }}>
        <div
          id="map"
          ref={mapContainer}
          style={{ flexGrow: "1", height: "100%" }}
        />
      </div>
      <div className="absolute inset-x-0 top-2 mx-3 flex  flex-col justify-center space-y-2">
        <Tabs
          selectedIndex={selectedTabIndex}
          setSelectedIndex={handleTabUpdate}
        />
        <Tags
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={handleTagsUpdate}
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
