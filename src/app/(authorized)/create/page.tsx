"use client";
import Button from "@/app/components/button";
import LocationInput from "@/app/components/locationInput";
import MovieInput from "@/app/components/movieInput";
import TextInput from "@/app/components/textInput";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type inputsProp = {
  title: string | null;
  latitude: number | null;
  longitude: number | null;
  movieUrl: string | null;
  tags: string[];
};

export default function CreatePage() {
  const [movie, setMovie] = useState<File | null>(null);
  const [inputs, setInputs] = useState<inputsProp>({
    title: null,
    latitude: null,
    longitude: null,
    movieUrl: null,
    tags: [],
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
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          tags: inputs.tags,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-row justify-center">
        <p className="text-3xl font-semibold text-secondary">3Dモデル作成</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch space-y-5 px-5"
      >
        <TextInput
          name={"title"}
          labelName={"タイトル"}
          placeHolder={"和歌山ラーメン"}
          onChange={handleChange}
        />
        <LocationInput onChange={handleChange} />
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
        <Button text={"シェア"}>
          <PaperAirplaneIcon className="h-6 w-6 text-white" />
        </Button>
      </form>
    </div>
  );
}
