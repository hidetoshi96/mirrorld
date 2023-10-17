import { Dialog } from "@headlessui/react";
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
  const handleUpdate = async (stampName: string) => {
    console.log("handleUpdate");
    const response = await fetch(`/api/posts/${post.id}/${stampName}`, {
      method: "POST",
    });
    console.log(response);
    postsUpdate();
  };

  const date = new Date(post.createdTime);
  return (
    <Dialog open={isOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 z-40 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto h-5/6 max-w-sm overflow-y-scroll rounded-xl bg-white">
          <div className="mx-8 my-8 grid justify-items-stretch space-y-2.5">
            <div className="flex flex-row place-self-center">
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
            <iframe
              className="place-self-center"
              src={`https://lumalabs.ai/embed/${post.slug}?mode=video&background=%23ffffff&color=%23000000&showTitle=false&loadBg=false&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=true`}
              width="300"
              height="450"
              title="luma embed"
            ></iframe>
            <p className="text-center text-xs">
              {`${date.getFullYear()}年${
                date.getMonth() + 1
              }月${date.getDate()}日`}
            </p>
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
