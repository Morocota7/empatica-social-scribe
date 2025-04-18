
import { Slider } from "@/components/ui/slider";

interface ToneSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}

export const ToneSlider = ({ label, value, onChange, minLabel, maxLabel }: ToneSliderProps) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm">{value}/10</span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={10}
        step={1}
        onValueChange={(values) => onChange(values[0])}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};
