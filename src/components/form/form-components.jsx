import { useState } from "react";

export function CustomInputText({ label, labelKey, defaultValue, register }) {
  const inputLabel = label ? label : labelKey;
  return (
    <div className="relative rounded-md shadow-sm mb-2">
      <label className="block font-medium text-gray-700">
        {inputLabel}
        <input
          defaultValue={defaultValue}
          className="form-input border border-gray-300 py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...register(labelKey)}
        />
      </label>
    </div>
  );
}

export function CustomDropdownSelector({
  label,
  labelKey,
  register,
  numbers = [6, 8, 10],
}) {
  const inputLabel = label ? label : labelKey;
  return (
    <div className="relative rounded-md shadow-sm mb-2">
      <label className="block font-medium text-gray-700">
        {inputLabel}
        <select
          className="form-select border border-gray-300 py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...register(labelKey)}
        >
          {numbers.map((nb) => (
            <option value={nb}>{nb}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function CustomTextAreaInput({
  label,
  labelKey,
  defaultValue,
  register,
  maxHeight = "300px",
}) {
  const inputLabel = label ? label : labelKey;
  return (
    <div className="relative rounded-md shadow-sm mb-2">
      <label className="block font-medium text-gray-700">
        {inputLabel}
        <textarea
          defaultValue={defaultValue}
          className="form-textarea border border-gray-300 py-3 px-4 block h-20 w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-y"
          style={{ maxHeight }}
          {...register(labelKey)}
        ></textarea>
      </label>
    </div>
  );
}

export function CustomFormButton({
  label,
  labelKey,
  defaultValue,
  register,
  color = "orange",
  buttonType = "button",
  onClick,
}) {
  return (
    <button
      type={buttonType}
      style={{ backgroundColor: color }}
      className={`hover:brightness-90 text-white font-medium py-2 px-4 rounded-md w-[100px] h-fit`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function CustomFormContainer({ children, width }) {
  return (
    <div className="bg-white rounded-md p-6 shadow-md" style={{ width: width }}>
      {children}
    </div>
  );
}
