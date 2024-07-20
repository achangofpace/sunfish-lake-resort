import { useMutation /*, useQueryClient*/ } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";

export default function useSignup() {
  // todo
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      // queryClient.setQueryData();
      // navigate("/login", { replace: true });
      toast.success("Account successfully created. Please verify the new account from the user's email address");
    },
    onError: () => toast.error("Failed to signup")
  });
  return { signup, isPending };
}