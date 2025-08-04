import { FC } from "react";
import { Slider } from "@shadcn/ui";

interface Props {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}

const SliderControl: FC<Props> = ({ label, min, max, value, onChange }) => (
  <div>
    <label className="block font-medium">
      {label}: {value}
    </label>
    <Slider
      defaultValue={[value]}
      min={min}
      max={max}
      onValueChange={([v]: any) => onChange(v)}
    />
  </div>
);

export default SliderControl;
