import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isPending: isCheckingOut } = useCheckout();
  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
      $size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
