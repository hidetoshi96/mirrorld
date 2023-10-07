import { ReactNode } from "react";

interface Props {
  text: string;
  addClass: string;
  children: ReactNode;
  onClick: () => void;
}

export default function Button({ onClick, text, addClass, children }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center space-x-2 rounded-full bg-primary px-5 py-1 text-white ${addClass}`}
    >
      {children}
      {text}
    </button>
  );
}
