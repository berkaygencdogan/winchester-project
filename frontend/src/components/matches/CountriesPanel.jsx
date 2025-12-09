export default function CountriesPanel() {
  return (
    <div className="p-3">
      <div className="bg-[#1B2534] p-3 rounded-md flex justify-between items-center mb-3">
        <span className="font-semibold">ALL</span>
        <input
          type="text"
          placeholder="Search"
          className="bg-[#0F1622] px-2 py-1 rounded text-sm outline-none"
        />
      </div>

      <div className="space-y-2">
        <CountryItem name="Argentina" flag="ar" leagues={14} />
        <CountryItem name="Brazil" flag="br" leagues={22} />
        <CountryItem name="Spain" flag="es" leagues={16} />
        <CountryItem name="England" flag="gb" leagues={12} />
      </div>
    </div>
  );
}

function CountryItem({ name, flag, leagues }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#1B2534] rounded-md cursor-pointer">
      <div className="flex items-center gap-2">
        <img
          src={`https://media.api-sports.io/flags/${flag}.svg`}
          className="w-6 h-4 rounded"
        />
        <span>{name}</span>
      </div>
      <span className="text-sm opacity-70">{leagues}</span>
    </div>
  );
}
