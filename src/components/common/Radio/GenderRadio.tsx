export interface GenderRadioProps {
  gender: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const GenderRadio = (props: GenderRadioProps) => {
  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        checked={props.gender}
        name="gender"
        value="true"
        onChange={props.onChange}
      />
      <p className="text-default ml-1 w-12 text-start text-fontBlack">남성</p>
      <input
        type="checkbox"
        checked={!props.gender}
        name="gender"
        value="false"
        onChange={props.onChange}
      />
      <p className="text-default ml-1 text-fontBlack">여성</p>
    </div>
  );
};
