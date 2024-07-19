import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {  mutate: deleteBooking, isPending } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => toast.error("Failed to delete booking")
  });
  return { deleteBooking, isPending };
}