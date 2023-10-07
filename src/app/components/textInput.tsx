interface Props {
  name: string;
  labelName: string;
  placeHolder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  name,
  labelName,
  placeHolder,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold text-secondary">{labelName}</p>
      <input
        name={name}
        type="text"
        className="form-input w-full rounded-md border border-gray text-center font-semibold text-secondary placeholder:text-gray"
        required
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
}
