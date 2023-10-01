const CardLoadingSkeleton = () => {
  return (
    <div className="flex xl:gap-5 gap-2 w-full xl:p-5 md:p-3 p-1 animate-pulse">
      <div className="w-1/3 bg-elife-600 h-40 rounded-md"></div>
      <div className="flex flex-col w-2/3 gap-4">
        <div className="w-3/4 h-6 bg-elife-600 rounded-md"></div>
        <div className="w-1/4 h-4 bg-elife-400 rounded-md"></div>
        <div className="w-1/4 h-4 bg-elife-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton;
