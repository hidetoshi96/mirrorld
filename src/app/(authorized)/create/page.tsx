"use client";
import Button from "@/app/components/button";
import LocationInput from "@/app/components/locationInput";
import MovieInput from "@/app/components/movieInput";
import TextInput from "@/app/components/textInput";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Location } from "@/types/post";
import Alert from "@/app/components/alert";

type inputsProp = {
  title: string | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  movieUrl: string | null;
  tags: string[];
};

type alertProp = {
  isOpen: boolean;
  status: "error" | "success";
};

export default function CreatePage() {
  const [movie, setMovie] = useState<File | null>(null);
  const [inputs, setInputs] = useState<inputsProp>({
    title: null,
    location: { longitude: null, latitude: null },
    movieUrl: null,
    tags: [],
  });
  const [alertState, setAlertState] = useState<alertProp>({
    isOpen: false,
    status: "error",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    switch (key) {
      case "latitude":
      case "longitude":
        setInputs({ ...inputs, [key]: parseFloat(event.target.value) });
        break;
      case "tags":
        const tagArray = event.target.value.split(" ");
        const removeEmptyTags = tagArray.filter((tag) => tag !== "");
        const uniqueTagObjects = new Set(removeEmptyTags);
        setInputs({
          ...inputs,
          [key]: Array.from(uniqueTagObjects),
        });
        break;
      default:
        setInputs({ ...inputs, [key]: event.target.value });
    }
  };
  const handleChangeLocation = (newLocation: Location) => {
    setInputs({ ...inputs, location: newLocation });
  };

  const handleChangeMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const fileObject = event.target.files[0];
    const value = window.URL.createObjectURL(fileObject);
    setInputs({ ...inputs, movieUrl: value });
    setMovie(fileObject);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createRes = await fetch("/api/create/createCapture", {
        method: "POST",
        body: JSON.stringify({ title: inputs.title }),
      });
      const createResJson = await createRes.json();
      const uploadPath = createResJson.signedUrls.source;
      const slug = createResJson.capture.slug;

      const uploadRes = await fetch(uploadPath, {
        method: "PUT",
        body: movie,
      });

      await fetch("/api/create/triggerCapture", {
        method: "POST",
        body: JSON.stringify({ slug: slug }),
      });
      const res = await fetch("/api/create", {
        method: "PUT",
        body: JSON.stringify({
          title: inputs.title,
          slug: slug,
          location: inputs.location,
          tags: inputs.tags,
        }),
      });
      setAlertState({ isOpen: true, status: "success" });
    } catch (error) {
      console.error(error);
      setAlertState({ isOpen: true, status: "error" });
    }
  };

  return (
    <>
      <div className="flex h-full flex-col space-y-8 pt-8">
        <div className="flex flex-row justify-center">
          <p className="text-3xl font-semibold text-secondary">3Dモデル作成</p>
        </div>
        <div className="flex grow items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="mb-6 max-w-sm space-y-5 rounded-lg border-0 border-gray px-8 sm:border sm:py-4"
          >
            <TextInput
              name={"title"}
              labelName={"タイトル"}
              placeHolder={"和歌山ラーメン"}
              onChange={handleChange}
            />
            <LocationInput
              location={inputs.location}
              onChange={handleChangeLocation}
            />
            <MovieInput
              movieUrl={inputs["movieUrl"]}
              onChange={handleChangeMovie}
            />
            <TextInput
              name={"tags"}
              labelName={"タグ"}
              placeHolder={"食べ物 ラーメン 日本"}
              onChange={handleChange}
            />
            <Button text={"シェア"} addClass="w-full">
              <PaperAirplaneIcon className="h-6 w-6 text-white" />
            </Button>
          </form>
        </div>
      </div>
      <Alert
        isOpen={alertState.isOpen}
        status={alertState.status}
        setState={setAlertState}
      />
    </>
  );
}
