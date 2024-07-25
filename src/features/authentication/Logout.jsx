import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { uploadAll } from "../../data/Uploader";

function Logout() {
  const { logout, isPending: isLoggingOut } = useLogout();
  async function handleLogout() {
    await uploadAll();
    logout();
  }
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={handleLogout}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
