import { useState } from "react";

interface Props {
  name: string;
  text: string;
  count: number;
  clicked: boolean;
  onClick: (stampName: string) => void;
  clickedIcon: React.ReactElement;
  unClickedIcon: React.ReactElement;
}

export default function StampButton({
  name,
  text,
  count,
  clicked,
  onClick,
  clickedIcon,
  unClickedIcon,
}: Props) {
  const [stampClicked, setStampClicked] = useState<boolean>(clicked);
  const handleClick = () => {
    setStampClicked(!clicked);
    onClick(name);
  };
  const renderIcon = () => {
    if (clicked === stampClicked) {
      return clicked ? clickedIcon : unClickedIcon;
    } else {
      return stampClicked ? clickedIcon : unClickedIcon;
    }
  };
  const renderCount = () => {
    if (clicked === stampClicked) {
      return count;
    } else {
      return stampClicked ? count + 1 : count - 1;
    }
  };

  return (
    <button
      className="grid grid-flow-col place-items-center rounded-full bg-primary py-1 text-white"
      onClick={handleClick}
    >
      {renderIcon()}
      <div className="text-xxs">{text}</div>
      <div className="row-span-2 text-base">{renderCount()}</div>
    </button>
  );
}
