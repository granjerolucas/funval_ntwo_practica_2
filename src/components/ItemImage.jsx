export const ItemImage = ({ info }) => {
  const imageSrc = `https://live.staticflickr.com/${info.server}/${info.id}_${info.secret}_m.jpg`;
  return (
    <a
      href="#"
      className="flex md:h-40x flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col   hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden"
    >
      <img
        className="object-cover  rounded-lg  hover:scale-125 duration-300 md:w-44 md:h-44"
        src={imageSrc}
        alt=""
      />
    </a>
  );
};
