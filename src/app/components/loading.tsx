export default function Spinner() {
  return (
    <div className="grid h-fit w-fit animate-spinSlow grid-cols-2 place-items-center gap-1">
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
  );
}
