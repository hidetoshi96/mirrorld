import { Popover } from "@headlessui/react";
import { IconPlus } from "@tabler/icons-react";
import TagCombobox from "./combobox";

interface Props {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (selectedTags: string[]) => void;
}
export default function Tags({ tags, selectedTags, setSelectedTags }: Props) {
  return (
    <Popover className="relative">
      <div className="flex-cols flex space-x-2">
        <Popover.Button className="rounded-full bg-primary text-white">
          <IconPlus width="24" height="24" strokeWidth="2" />
        </Popover.Button>
        {selectedTags.map((tag: string, index: number) => (
          <p
            key={index}
            className="rounded-full bg-primary px-4 align-middle text-white"
          >
            {tag}
          </p>
        ))}
      </div>
      <Popover.Panel className="absolute z-10 mt-3 transform px-4">
        <div className="m-4 overflow-hidden rounded-lg">
          <div className="relative grid gap-1 ">
            <TagCombobox
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
