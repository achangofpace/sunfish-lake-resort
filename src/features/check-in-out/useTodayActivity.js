import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const { data: todayActiveStays, isPending } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity
  });

  return { todayActiveStays, isPending };
}