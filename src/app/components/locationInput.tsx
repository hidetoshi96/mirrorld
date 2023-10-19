interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationInput({ onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold text-secondary">位置情報</p>
      <div className="grid grid-flow-col justify-stretch space-x-2.5">
        <div>
          <p className="text-base font-semibold text-secondary">経度</p>
          <input
            name="longitude"
            type="number"
            step="0.00001"
            className="form-input w-full rounded-md border border-gray text-center text-xs font-semibold text-secondary placeholder:text-gray"
            required
            placeholder="135.15208617872494"
            onChange={onChange}
          />
        </div>
        <div>
          <p className="text-base font-semibold text-secondary">緯度</p>
          <input
            name="latitude"
            type="number"
            className="form-input w-full rounded-md border border-gray text-center text-xs font-semibold text-secondary placeholder:text-gray"
            step="0.00001"
            required
            placeholder="34.26566384012747"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
