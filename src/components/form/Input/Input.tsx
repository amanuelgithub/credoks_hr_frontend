function Input({
  type,
  label,
  placeholder,
}: {
  type: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor="exampleFormControlInput4"
        className="form-label inline-block mb-2 text-gray-700 text-sm"
      >
        {label}
      </label>
      <input
        type={type}
        className="
          form-control
          block
          w-full
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        id="exampleFormControlInput4"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
