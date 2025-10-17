import React, { TextareaHTMLAttributes } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, value, onChange, error, required, placeholder, rows }) => {
  const baseClasses = "w-full px-4 py-3 bg-surface border rounded-lg text-primary-text placeholder-secondary-text/70 focus:outline-none transition-all duration-300 ease-in-out";
  const errorClasses = 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';
  const defaultClasses = 'border-border-color focus:border-accent focus:ring-2 focus:ring-accent/20';

  return (
    <div className="text-left">
      <label className="block text-secondary-text font-medium mb-2" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${baseClasses} ${error ? errorClasses : defaultClasses}`}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
};

export default FormTextArea;