const Badge = (props: {
  label: string;
  value: string;
  labelWidth?: string;
  valueWidth?: string;
}) => {
  const labelWidth = props.labelWidth || "auto";
  const valueWidth = props.valueWidth || "auto";
  return (
    <div className="inline-flex items-center">
      <span
        className={`-mr-px flex min-h-[20px] items-center justify-start rounded-l-full bg-white px-2 py-0.5 text-xs font-medium text-gray-800`}
        style={{ width: labelWidth }}
      >
        {props.label || "\u00A0"}
      </span>
      <span
        className="flex min-h-[20px] min-w-[20px] items-center justify-start rounded-r-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
        style={{ width: valueWidth }}
      >
        {props.value || "\u00A0"}
      </span>
    </div>
  );
};

export default Badge;
