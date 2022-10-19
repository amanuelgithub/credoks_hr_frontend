function Image({ image }: { image: any }) {
  return (
    <div className="w-16 rounded-full border-gray-200">
      <img alt="" src={image.src} />
    </div>
  );
}
export default Image;
