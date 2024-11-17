import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { ReactComponent as ChevronUpIcon } from "../assets/icons/chevron_up.svg";
import { ReactComponent as CheckIcon } from "../assets/icons/check.svg";

export type ListboxOptionType = {
  label: string;
  value: number;
};

interface ListboxType {
  options: Array<ListboxOptionType>;
  label?: string;
  selectedValue?: number;
  onChange?: (option: ListboxOptionType) => void;
  firstSelect?: boolean;
}

const ListboxComponent = ({
  options,
  label,
  selectedValue,
  onChange,
  firstSelect,
}: ListboxType) => {
  const [selected, setSelected] = useState<ListboxOptionType | null>(null);

  useEffect(() => {
    if (selectedValue !== undefined) {
      const selectedOption = options.filter((o) => o.value === selectedValue);
      if (selectedOption && selectedOption.length > 0)
        setSelected(selectedOption[0]);
    } else {
      if (firstSelect) setSelected(options[0]);
    }
  }, [firstSelect, options, selectedValue]);

  const handleSelected = (option: ListboxOptionType) => {
    // console.log(option);
    setSelected(option);
    if (typeof onChange === "function") onChange(option);
  };
  return (
    <Listbox value={selected} onChange={handleSelected}>
      <div className="relative">
        <Listbox.Button className="relative cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-0 focus-visible:ring-offset-sky-300 sm:text-sm py-2 px-3 pr-6">
          <span className="block truncate">{label || selected?.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpIcon
              className="h-3 w-3 text-gray-600"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 w-auto mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListboxComponent;
