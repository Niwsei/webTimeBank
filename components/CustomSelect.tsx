import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = "Select an option", label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  
  const buttonClasses = "w-full flex items-center justify-between text-left bg-surface border rounded-lg text-primary-text placeholder-secondary-text focus:outline-none transition-all duration-300 ease-in-out px-4 py-3";
  const openClasses = "border-accent ring-2 ring-accent/20";
  const closedClasses = "border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="w-full font-prompt" ref={ref}>
       {label && <label className="block text-secondary-text font-medium mb-2">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonClasses} ${isOpen ? openClasses : closedClasses}`}
        >
          <span className={selectedOption ? 'text-primary-text' : 'text-secondary-text'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon className={`w-5 h-5 text-secondary-text transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-surface border border-border-color rounded-lg shadow-lg overflow-hidden animate-dropdown-enter">
            <ul className="max-h-60 overflow-y-auto">
              {options.map(option => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="px-4 py-3 text-primary-text hover:bg-accent-light cursor-pointer flex items-center justify-between transition-colors"
                >
                  {option.label}
                  {option.value === value && <CheckIcon className="w-5 h-5 text-accent" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;