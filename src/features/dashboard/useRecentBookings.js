import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`]
  });

  return { bookings, isPending };
}