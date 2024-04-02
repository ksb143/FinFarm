const InventoryItem = () => (
  <div className="static h-40 w-40 bg-amber-100">
    <div className="mx-auto mb-1 mt-1 h-32 w-36 bg-amber-200"></div>
    <div className="flex flex-row justify-between border-emerald-400 bg-white">
      <div className="w-7 border-2">+</div>
      <div className="flex-grow border-2 border-emerald-400 bg-white">0 개</div>
      <div className="w-7 border-2 border-emerald-400 bg-white">-</div>
    </div>
  </div>
);

const Inventory_test = () => {
  return (
    <>
      <div
        className="relative flex flex-col"
        style={{ width: '400px', height: '300px' }}
      >
        <div className="mb-3 bg-amber-200 text-center">
          <h1 className="border-2 border-amber-700">창고</h1>
        </div>
        <div className="overflow-auto border-2 border-amber-400 bg-amber-400 px-3 py-3">
          <div className="grid grid-cols-5 gap-5 bg-amber-700 px-3 py-3 text-center">
            {[...Array(20)].map((_, index) => (
              <InventoryItem key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory_test;
