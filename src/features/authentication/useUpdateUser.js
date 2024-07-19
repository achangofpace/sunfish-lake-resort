import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Account successfully updated`);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { isUpdatingUser, updateUser };
}