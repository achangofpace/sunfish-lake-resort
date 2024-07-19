import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((acc, booking) => acc+booking.extrasPrice, 0);
  // 3.
  const checkIns = confirmedStays.length;
  // 4.
  // const { cabins, isPending: isLoadingCabins } = useCabins();
  // if (isLoadingCabins) {
  //   return <Spinner />;
  // }

  const totalCabinsOccupied = confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0);
  const occupancyRate = totalCabinsOccupied / (cabinCount * numDays);
  const occupancyRatePercentage = Math.round(occupancyRate * 10000) / 100;

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Sales"}
        value={formatCurrency(sales)}
        color={"green"}
        icon={<HiOutlineBanknotes/>}
      />
      <Stat
        title={"Check-ins"}
        color={"indigo"}
        value={checkIns}
        icon={<HiOutlineCalendarDays/>}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        value={`${occupancyRatePercentage} %`}
        icon={<HiOutlineChartBar/>}
      />
    </>
  );
}

export default Stats;
