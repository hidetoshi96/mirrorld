"use client";
import Button from "@/app/components/button";
import LocationInput from "@/app/components/locationInput";
import MovieInput from "@/app/components/movieInput";
import TextInput from "@/app/components/textInput";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type inputsProp = {
  title: string | null;
  latitude: number | null;
  longitude: number | null;
  movieUrl: string | null;
};

export default function createPage() {
  const { data: session } = useSession();
  console.log(session);
  const [movie, setMovie] = useState<File | null>(null);
  const [inputs, setInputs] = useState<inputsProp>({
    title: null,
    latitude: null,
    longitude: null,
    movieUrl: null,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value =
      key === "latitude" || key === "longitude"
        ? parseFloat(event.target.value)
        : event.target.value;
    setInputs({ ...inputs, [key]: value });
  };
  const handleChangeMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const fileObject = event.target.files[0];
    const value = window.URL.createObjectURL(fileObject);
    setInputs({ ...inputs, movieUrl: value });
    setMovie(fileObject);
  };
  const handleShare = async () => {
    console.log(inputs);
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
      console.log(await uploadRes.json());

      const triggerRes = await fetch("/api/create/trigger", {
        method: "POST",
        body: JSON.stringify({ slug: slug }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-row justify-center">
        <p className="text-3xl font-semibold text-secondary">3Dモデル作成</p>
      </div>
      <form
        action="/api/posts"
        method="post"
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
          name={"tag"}
          labelName={"タグ"}
          placeHolder={"#食べ物 #ラーメン #日本"}
          onChange={handleChange}
        />
        <Button text={"シェア"} onClick={handleShare} addClass={""}>
          <PaperAirplaneIcon className="h-6 w-6 text-white" />
        </Button>
      </form>
    </div>
  );
}
