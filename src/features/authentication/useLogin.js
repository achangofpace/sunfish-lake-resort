import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard", { replace: true });
      toast.success("Successful login");
    },
    onError: (err) => {
      toast.error("Failed to login");
    }
  });
  return { isLoggingIn, login };
}