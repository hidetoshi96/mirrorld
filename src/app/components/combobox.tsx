import { Combobox } from "@headlessui/react";
import { IconChevronDown, IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (selectedTags: string[]) => void;
}

export default function TagCombobox({
  tags,
  selectedTags,
  setSelectedTags,
}: Props) {
  const [query, setQuery] = useState("");
  const filteredTags =
    query === ""
      ? tags
      : tags.filter((tag: string) =>
          tag
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  return (
    <Combobox value={selectedTags} onChange={setSelectedTags} multiple>
      <div className="relative m-1 cursor-default rounded-md drop-shadow-md">
        <Combobox.Input
          className="border-none py-2 pl-3 pr-10 text-sm leading-5 text-primary focus:ring-0"
          displayValue={(tag: string) => tag}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 h-full pr-2 text-secondary">
          <IconChevronDown
            strokeWidth="1"
            className="transform ui-not-open:rotate-180"
          />
        </Combobox.Button>
      </div>
      <Combobox.Options>
        <div className="m-1 rounded-md drop-shadow-md">
          {filteredTags.length === 0 && query !== "" ? (
            <div className="cursor-default select-none bg-white text-center text-primary">
              見つかりませんでした
            </div>
          ) : (
            filteredTags.map((tag: string, index: number) => (
              <Combobox.Option
                key={index}
                value={tag}
                className="flex justify-start ui-active:bg-primary ui-active:text-white ui-not-active:bg-white ui-not-active:text-primary"
              >
                <div className="mx-2">
                  {selectedTags.includes(tag) ? <IconMinus /> : <IconPlus />}
                </div>
                <p>{tag}</p>
              </Combobox.Option>
            ))
          )}
        </div>
      </Combobox.Options>
    </Combobox>
  );
}
