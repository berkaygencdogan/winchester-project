import { useEffect, useState } from "react";

export default function CountriesPanel() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/football/countries")
      .then((res) => res.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-3 rounded-md bg-white border border-slate-200 dark:bg-[#1B2534] dark:border-gray-700">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded text-sm bg-slate-100 dark:bg-[#0F1622]"
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filtered.map((c) => (
          <CountryItem key={c.code} country={c} />
        ))}
      </div>
    </div>
  );
}

function CountryItem({ country }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 dark:hover:bg-[#1B2534] cursor-pointer">
      <div className="flex items-center gap-2">
        {country.flag && (
          <img
            src={country.flag}
            className="w-6 h-4 rounded"
            alt={country.name}
          />
        )}
        <span>{country.name}</span>
      </div>
    </div>
  );
}
