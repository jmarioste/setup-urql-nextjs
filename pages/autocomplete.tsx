import React, { memo } from "react";
import CountriesAutocomplete from "../components/auto-complete/CountriesAutocomplete";

const AutoCompletePage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-10">
        <CountriesAutocomplete />
      </div>
    </div>
  );
};

export default memo(AutoCompletePage);
