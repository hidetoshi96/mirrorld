"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";
import Models from "../models";
import { signOut, useSession } from "next-auth/react";
import { IconUserCircle } from "@tabler/icons-react";
import { Post } from "@/types/post";

interface Props {
  initialPosts: { [key: string]: Post[] };
}

export default function MyPageContainer({ initialPosts }: Props) {
  const [posts, setPosts] = useState<{ [key: string]: Post[] }>(initialPosts);
  const [selectPostId, setSelectPostId] = useState<[string, number]>(["", 0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const handlePostUpdate = async () => {
    const res = await fetch("api/mypage", { method: "GET" });
    const json = await res.json();
    setPosts(json);
  };
  return (
    <>
      <div className="space-y-8 py-8">
        <div className="relative flex flex-row items-center justify-center">
          <p className="text-3xl font-semibold text-secondary ">マイページ</p>
          <button className="absolute right-5" onClick={() => signOut()}>
            logout
          </button>
        </div>
        <div className="space-y-10 px-5">
          <div className="grid grid-flow-col place-content-center gap-x-5">
            {session?.user?.image ? (
              <Image
                className="h-20 w-20 rounded-full object-cover"
                src={session?.user?.image}
                alt="Profile image"
                width={80}
                height={80}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WQ8AAjcBWtrfQHkAAAAASUVORK5CYII="
              />
            ) : (
              <IconUserCircle
                className="h-20 w-20 rounded-full text-primary"
                strokeWidth={"1"}
              />
            )}
            <p className="self-center text-xl font-semibold text-secondary">
              {session?.user?.name}
            </p>
          </div>
          <div className="space-y-5">
            <Models
              title={"MyPosts"}
              posts={posts.posts}
              setSelectPostId={(index) => {
                setSelectPostId(["posts", index]);
              }}
              setIsModalOpen={setIsModalOpen}
            />
            <Models
              title={"Wonderful"}
              posts={posts.wonderfulPosts}
              setSelectPostId={(index) => {
                setSelectPostId(["wonderfulPosts", index]);
              }}
              setIsModalOpen={setIsModalOpen}
            />
            <Models
              title={"Nice Challenge"}
              posts={posts.niceChallengePosts}
              setSelectPostId={(index) => {
                setSelectPostId(["niceChallengePosts", index]);
              }}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          post={posts[selectPostId[0]][selectPostId[1]]}
          postsUpdate={handlePostUpdate}
        ></Modal>
      )}
    </>
  );
}
