import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // filters
  const filterValue = searchParams.get("status");
  /* could implement multiple filters here by specifying type and using an array of filters */
  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  // sorting
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isPending
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  // PRE-FETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, (page+1)],
      queryFn: () => getBookings({ filter, sortBy, page: page+1 })
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, (page-1)],
      queryFn: () => getBookings({ filter, sortBy, page: page-1 })
    });
  }

  return { bookings, count, error, isPending };
}