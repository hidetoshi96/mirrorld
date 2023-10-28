export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spinSlow grid grid-cols-2 grid-rows-2 gap-1">
        <div className="grid h-8 w-8 rotate-0 transform-gpu content-center justify-center rounded-full rounded-br-none bg-primary">
          <div className="h-7 w-7 rounded-full bg-white" />
        </div>
        <div className="grid h-8 w-8 rotate-90 transform-gpu content-center justify-center rounded-full rounded-br-none bg-primary">
          <div className="h-7 w-7 rounded-full bg-white" />
        </div>
        <div className="grid h-8 w-8 -rotate-90 transform-gpu content-center justify-center rounded-full rounded-br-none bg-primary">
          <div className="h-7 w-7 rounded-full bg-white" />
        </div>
        <div className="grid h-8 w-8 rotate-180 transform-gpu content-center justify-center rounded-full rounded-br-none bg-primary">
          <div className="h-7 w-7 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
