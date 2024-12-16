import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (!cabins.length) <Empty resourceName="cabins" />;

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";
  console.log(filterValue);

  let filterdCabins;

  if (filterValue === "all") filterdCabins = cabins.slice();
  if (filterValue === "no-discount")
    filterdCabins = cabins.slice().filter((item) => item.discount === 0);
  if (filterValue === "with-discount")
    filterdCabins = cabins.slice().filter((item) => item.discount > 0);

  console.log(filterdCabins);

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterdCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // Noob way
  // const sortValue = searchParams.get("sortBy") || "name-asc";
  // console.log(sortValue);

  // let sortedCabins;

  // switch (sortValue) {
  //   case "name-asc":
  //     sortedCabins = filterdCabins.slice().sort((a, b) => a.name - b.name);
  //     break;
  //   case "name-desc":
  //     sortedCabins = filterdCabins.slice().sort((a, b) => b.name - a.name);
  //     break;
  //   case "regularPrice-asc":
  //     sortedCabins = filterdCabins
  //       .slice()
  //       .sort((a, b) => a.regularPrice - b.regularPrice);
  //     break;
  //   case "regularPrice-desc":
  //     sortedCabins = filterdCabins
  //       .slice()
  //       .sort((a, b) => b.regularPrice - a.regularPrice);
  //     break;
  //   case "maxCapacity-asc":
  //     sortedCabins = filterdCabins
  //       .slice()
  //       .sort((a, b) => a.maxCapacity - b.maxCapacity);
  //     break;
  //   case "maxCapacity-desc":
  //     sortedCabins = filterdCabins
  //       .slice()
  //       .sort((a, b) => b.maxCapacity - a.maxCapacity);
  //     break;
  //   default:
  //     cabins;
  // }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div></div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
