import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(evnt) {
    searchParams.set("sortBy", evnt.target.value);
    setSearchParams(searchParams);
  }
  const selectedSortValue = searchParams.get("sortBy") || "";
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={selectedSortValue}
    />
  );
}

export default SortBy;
