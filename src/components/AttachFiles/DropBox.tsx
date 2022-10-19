import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";

export default function DropBox({ onDrop }: { onDrop: any }) {
  const [dropBoxColor, setDropBoxColor] = useState("border-gray-500");

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    let borderColor = "";
    if (isDragAccept) {
      borderColor = "border-green-500";
    } else if (isFocused) {
      borderColor = "border-yellow-500";
    } else if (isDragReject) {
      borderColor = "border-red-500";
    } else {
      borderColor = "border-gray-500";
    }
    setDropBoxColor(borderColor);
  }, [isDragAccept, isFocused, isDragReject]);

  const newList = acceptedFiles.map((file) => (
    <div
      key={(file as any).path}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: "lightgray",
      }}
    >
      <div>
        {/* file name */}
        <p>{(file as any).path}</p>
      </div>
      {/* file size in megabytes */}
      <div>{file.size / 1000000}mb</div>
      <div>{/* <RemoveCircleOutlineIcon sx={{ color: "red" }} /> */}</div>
    </div>
  ));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: 1,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <p style={{ fontWeight: "bold" }}>Attach Logo:</p>
      </div>
      <div
        className={`flex h-32 w-full items-center justify-center border-2 border-dashed ${dropBoxColor}`}
        {...getRootProps({ isDragAccept, isFocused, isDragReject })}
      >
        <input {...getInputProps()} />
        <div>
          <div className="flex justify-center">
            <MdFileUpload
              className="text-gray-400 hover:cursor-pointer"
              onClick={open}
            />
          </div>
          <div className="flex justify-center">
            <p className="text-xs">
              Choose an Image or
              <span className="font-bold"> drag and drop</span> it here
            </p>
          </div>
        </div>
      </div>

      {/* uploaded files list */}
      <div>{newList}</div>
    </div>
  );
}
