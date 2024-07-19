import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending: isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, numDays, isPending: isLoadingStays } = useRecentStays();
  const { cabins, isPending: isLoadingCabins } = useCabins();
  // const totalGuestCapacity = cabins.reduce((acc, cabin) => acc + cabin.maxCapacity, 0);

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activity</div>
      <DurationChart confirmedStays={confirmedStays} numDays={numDays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
