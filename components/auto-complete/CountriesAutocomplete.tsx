import React, { useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import Autocomplete from "./Autocomplete";

type Country = {
  name: {
    common: string;
  };
};
const CountriesAutocomplete = () => {
  const [val, setVal] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffectOnce(() => {
    async function fetchData() {
      const url = "https://restcountries.com/v3.1/all?fields=name";
      const response = await fetch(url);
      const countries = (await response.json()) as Country[];
      const newItems = countries.map((p) => p.name.common).sort();
      setCountries(newItems);
    }

    fetchData();
  });

  useEffect(() => {
    if (!val) {
      setItems(countries);
      return;
    }
    const newItems = countries
      .filter((p) => p.toLowerCase().includes(val.toLowerCase()))
      .sort();
    setItems(newItems);
  }, [countries, val]);
  return <Autocomplete items={items} value={val} onChange={setVal} />;
};

export default CountriesAutocomplete;
