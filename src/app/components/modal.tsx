import { Dialog, Tab } from "@headlessui/react";
import StampButton from "./stampButton";
import Button from "./button";
import { IconMapPin, IconLink } from "@tabler/icons-react";
import {
  TrophyIcon as TrophyIconOutline,
  HandThumbUpIcon as HandThumbUpIconOutline,
  CurrencyYenIcon,
} from "@heroicons/react/24/outline";
import {
  TrophyIcon as TrophyIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";
import { Post } from "@/types/post";
import Link from "next/link";
import { useState } from "react";
import {
  CubeIcon,
  CubeTransparentIcon,
  FilmIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";

interface Props {
  isOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  post: Post;
  postsUpdate: () => void;
}

export default function Modal({
  isOpen,
  setIsModalOpen,
  post,
  postsUpdate,
}: Props) {
  const modes = ["slf", "sparkles", "lf", "video"];
  const [modeIndex, setModeIndex] = useState<number>(0);
  const date = new Date(post.createdTime);
  const handleUpdate = async (stampName: string) => {
    console.log("handleUpdate");
    const response = await fetch(`/api/posts/${post.id}/${stampName}`, {
      method: "POST",
    });
    console.log(response);
    postsUpdate();
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 z-40 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto h-fit max-h-full w-full max-w-md overflow-y-scroll rounded-xl bg-white">
          <div className="my-4 grid justify-items-stretch space-y-2.5 px-1">
            <div>
              <div className="flex flex-row justify-center place-self-center">
                <p>{post.title}</p>
                <Link
                  className="flex items-center"
                  href={`/map?latitude=${post.location.latitude}&longitude=${post.location.longitude}`}
                >
                  <IconMapPin
                    width={"16"}
                    height={"16"}
                    strokeWidth={"1"}
                    className="text-primary"
                  />
                </Link>
                <button>
                  <IconLink
                    width={"16"}
                    height={"16"}
                    strokeWidth={"1"}
                    className="text-primary"
                  />
                </button>
              </div>
              <p className="text-right text-xs">
                {`${date.getFullYear()}年${
                  date.getMonth() + 1
                }月${date.getDate()}日`}
              </p>
              <iframe
                className="h-[30rem] w-full place-self-center"
                src={`https://lumalabs.ai/embed/${post.slug}?mode=${modes[modeIndex]}&background=%23ffffff&color=%23000000&showTitle=false&loadBg=false&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false`}
                title="luma embed"
              ></iframe>
              <div className="mt-1 flex items-center justify-end">
                <Tab.Group selectedIndex={modeIndex} onChange={setModeIndex}>
                  <Tab.List className="flex w-fit space-x-1 self-center rounded-lg bg-primary p-1">
                    <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
                      <CubeTransparentIcon className="mx-2 h-4 w-4 " />
                    </Tab>
                    <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
                      <CubeIcon className="mx-2 h-4 w-4" />
                    </Tab>
                    <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
                      <PhotoIcon className="mx-2 h-4 w-4 " />
                    </Tab>
                    <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
                      <FilmIcon className="mx-2 h-4 w-4" />
                    </Tab>
                  </Tab.List>
                </Tab.Group>
              </div>
            </div>
            <p className="text-center text-xs text-primary">
              {post.tags.map((tag) => "#" + tag).join(" ")}
            </p>
            <div className="grid grid-flow-row grid-cols-2 place-items-stretch gap-2 ">
              <StampButton
                name={"wonderful"}
                text={"Wonderful!"}
                count={post.stamps.wonderfulStamp.count}
                clicked={post.stamps.wonderfulStamp.clicked}
                onClick={handleUpdate}
                clickedIcon={<TrophyIconSolid className="h-5 w-5 text-white" />}
                unClickedIcon={
                  <TrophyIconOutline className="h-5 w-5 text-white" />
                }
              />
              <StampButton
                name={"niceChallenge"}
                text={"Nice Challenge!"}
                count={post.stamps.niceChallengeStamp.count}
                clicked={post.stamps.niceChallengeStamp.clicked}
                onClick={handleUpdate}
                clickedIcon={
                  <HandThumbUpIconSolid className="h-5 w-5 text-white" />
                }
                unClickedIcon={
                  <HandThumbUpIconOutline className="h-5 w-5 text-white" />
                }
              />
              <Button
                text={"購入"}
                addClass={"col-span-2"}
                onClick={() => {
                  console.log("購入Click");
                }}
              >
                <CurrencyYenIcon className="h-6 w-6 text-white" />
              </Button>
            </div>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
