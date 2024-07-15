import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin as createOrEditCabinApi } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: createOrEditCabinApi,
    onSuccess: () => {
        toast.success("New cabin successfully created");
        queryClient.invalidateQueries({
        queryKey: ["cabin"]
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { isEditing, editCabin };
}