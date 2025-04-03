const Checkbox = (props: {
  label: string;
  checked: boolean;
  extraClasses?: string;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <label className="mx-2 mt-1 inline-flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <span className={`text-gray-700 ${props.extraClasses}`}>
        {props.label}
      </span>
    </label>
  );
};

export default Checkbox;
