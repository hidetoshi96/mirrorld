import { Tab } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/20/solid";
import { UserGroupIcon } from "@heroicons/react/20/solid";

interface Props {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}
export default function Tabs({ selectedIndex, setSelectedIndex }: Props) {
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex w-fit space-x-1 self-center rounded-lg bg-primary p-1">
        <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
          <UserIcon className="mx-7 h-7 w-7 " />
        </Tab>
        <Tab className="flex w-fit justify-center rounded-md ui-selected:bg-white ui-selected:text-primary ui-not-selected:bg-primary ui-not-selected:text-white">
          <UserGroupIcon className="mx-7 h-7 w-7" />
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
}
