import { useCallback, useState } from "react";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";

function AttachFiles() {
  const [images, setImages] = useState([{}]);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <div>
      <DropBox onDrop={onDrop} />
      <ShowImage images={images} />
    </div>
  );
}

export default AttachFiles;
