import { useSearchParams } from "react-router-dom";

import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resource="cabins"/>
  }

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  }

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a,b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table">
        <Table.Header role="row">
          <div />
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin}></CabinRow>
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
