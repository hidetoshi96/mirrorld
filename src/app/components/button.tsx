import { ReactNode } from "react";

interface Props {
  text: string;
  addClass?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ text, addClass, children, onClick }: Props) {
  return (
    <button
      type={"submit"}
      onClick={onClick}
      className={`flex justify-center space-x-2 rounded-full bg-primary px-5 py-1 text-white ${addClass}`}
    >
      {children}
      {text}
    </button>
  );
}
