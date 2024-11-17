import { useEffect, useState } from "react";
import DropdownList from "react-widgets/DropdownList";

export type ComboboxOptionType = {
  label: string;
  value: number;
};

interface ComboboxType {
  options: Array<ComboboxOptionType>;
  loading?: boolean;
  selectedValue: number | null;
  onChange?: (option: ComboboxOptionType) => void;
}

const ComboboxComponent = ({
  options,
  selectedValue,
  onChange,
}: ComboboxType) => {
  const [selected, setSelected] = useState<ComboboxOptionType | null>(null);

  useEffect(() => {
    if (selectedValue) {
      const selectedOption = options.filter((o) => o.value === selectedValue);
      // console.log("selectedOption:", selectedOption);
      if (selectedOption) {
        // console.log(selectedOption[0]);
        setSelected(selectedOption[0]);
      }
    }
  }, [options, selectedValue]);

  const handleSelected = (option: ComboboxOptionType) => {
    setSelected(option);
    if (typeof onChange === "function") onChange(option);
  };

  return (
    <DropdownList
      dataKey="value"
      textField="label"
      data={options}
      onChange={handleSelected}
      value={selected}
    />
  );
};

export default ComboboxComponent;
