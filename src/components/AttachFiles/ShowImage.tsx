import Image from "./Image";

function ShowImage({ images }: { images: any }) {
  const show = (image: any) => {
    return <Image image={image} />;
  };

  return <div className="container">{images.map(show)}</div>;
}

export default ShowImage;
