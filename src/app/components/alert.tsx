"use client";
import { Dialog } from "@headlessui/react";
import { IconCircleCheck } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  status: "success" | "error";
  message?: string;
  setState: Dispatch<
    SetStateAction<{ isOpen: boolean; status: "success" | "error" }>
  >;
}
export default function Alert({ isOpen, status, message, setState }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setState({ isOpen: false, status: status })}
    >
      <div className="fixed inset-0 z-40 bg-black/30" area-hidden="true" />
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center">
        <Dialog.Panel className="flex flex-col justify-center space-y-4 rounded-xl bg-white p-4">
          <div className="space-y-1">
            <Dialog.Title className="flex content-center text-lg font-medium">
              <IconCircleCheck className="my-auto text-primary" />
              <p>{status === "success" ? "成功" : "失敗"}</p>
            </Dialog.Title>
            <p>
              {status === "success" ? (
                "3Dモデルの作成を開始しました"
              ) : (
                <>
                  エラーが発生しました
                  <br />
                  しばらくたってからもう一度やり直してください
                  <br />
                  {message}
                </>
              )}
            </p>
          </div>
          <button onClick={() => setState({ isOpen: false, status: status })}>
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
