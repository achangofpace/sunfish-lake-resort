import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      // queryClient.setQueryData();
      // navigate("/login", { replace: true });
      toast.success("Account successfully created. Please verify the new account from the user's email address");
    },
    onError: () => toast.error("Failed to signup")
  });
  return { isSigningUp, signup };
}