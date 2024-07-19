import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin as createOrEditCabinApi } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending } = useMutation({
    mutationFn: ({ updated_cabin_data, id }) => createOrEditCabinApi(updated_cabin_data, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { editCabin, isPending };
}