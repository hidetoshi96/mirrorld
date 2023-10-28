import { IconPlus, IconReplace } from "@tabler/icons-react";

interface Props {
  movieUrl: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MovieInput({ movieUrl, onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold text-secondary">
        動画ファイルを選択
      </p>
      <label className="flex w-full flex-col items-center rounded-md border border-solid border-gray">
        {movieUrl === null ? (
          <IconPlus strokeWidth={"1"} />
        ) : (
          <IconReplace strokeWidth={"1"} />
        )}

        <input
          name="movieUrl"
          type="file"
          required
          accept=".mp4" //mp4以外でlumaAIが動くか分からない
          capture="environment"
          onChange={onChange}
          className="hidden w-full file:rounded-md file:border file:border-solid file:border-gray file:bg-white"
        />
      </label>
      {movieUrl && <video src={movieUrl} autoPlay muted controls></video>}
    </div>
  );
}
