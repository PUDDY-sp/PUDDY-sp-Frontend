export interface NeuterRadioProps {
  neuter: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const NeuterRadio = (props: NeuterRadioProps) => {
  return (
    <div className="flex flex-row">
      <input
        type="radio"
        checked={props.neuter === true}
        name="neuter"
        value="true"
        onChange={props.onChange}
      />
      <p className="text-default ml-1 w-12 text-start text-fontBlack">Y</p>
      <input
        type="radio"
        checked={props.neuter === false}
        name="neuter"
        value="false"
        onChange={props.onChange}
      />
      <p className="text-default ml-1 text-fontBlack">N</p>
    </div>
  );
};
