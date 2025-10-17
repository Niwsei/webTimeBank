import React, { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type = "text", name, value, onChange, error, required, placeholder }) => {
  const baseClasses = "w-full px-4 py-3 bg-surface border rounded-lg text-primary-text placeholder-secondary-text/70 focus:outline-none transition-all duration-300 ease-in-out";
  const errorClasses = 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';
  const defaultClasses = 'border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20';

  return (
    <div className="mb-4 text-left">
      <label className="block text-secondary-text font-medium mb-2" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseClasses} ${error ? errorClasses : defaultClasses}`}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
};

export default FormField;