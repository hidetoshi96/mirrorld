import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Post } from "@/types/post";

interface Props {
  posts: Post[];
  setSelectPostId: (selectPostId: number) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}
export default function Models({
  posts,
  setSelectPostId,
  setIsModalOpen,
}: Props) {
  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <div className="flex w-full flex-row justify-between">
              <p className="text-2xl font-semibold text-secondary">Posts</p>
              <IconChevronDown
                strokeWidth="1"
                className={`${open ? "" : "rotate-180 transform"}`}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="grid-flow-rows grid grid-cols-2 place-items-start gap-8 px-2.5 md:grid-cols-4 lg:grid-cols-6">
              {posts != null &&
                posts.map((post: Post, index: number) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectPostId(index);
                        setIsModalOpen(true);
                      }}
                    >
                      <Image
                        priority
                        className="aspect-platinum rounded-2xl object-cover"
                        src={post.imageUrl}
                        alt="Post image"
                        height={1600}
                        width={900}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WQ8AAjcBWtrfQHkAAAAASUVORK5CYII="
                      />
                      <p className="text-base font-semibold text-secondary">
                        {post.title}
                      </p>
                    </button>
                  );
                })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
