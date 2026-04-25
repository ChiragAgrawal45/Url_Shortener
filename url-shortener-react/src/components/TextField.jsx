const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">

      <label
        htmlFor={id}
        className={`${className || ""} font-semibold text-md`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${
          errors[id]?.message ? "border-red-500" : "border-slate-600"
        } ${className || ""}`}

        {...register(id, {
          required: required ? message : false,

          minLength: min
            ? {
                value: min,
                message: `Minimum ${min} characters required`,
              }
            : undefined,

          pattern:
            type === "email"
              ? {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/,
                  message: "Enter a valid URL",
                }
              : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600">
          {errors[id]?.message}
        </p>
      )}

    </div>
  );
};

export default TextField;