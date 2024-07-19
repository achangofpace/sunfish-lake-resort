import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending: isLoadingBooking } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isPending: isCheckingOut } = useCheckout();
  const { deleteBooking, isPending: isDeletingBooking } = useDeleteBooking();

  if (isLoadingBooking) {
    return <Spinner />;
  }

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal.Open opens="page-delete-booking">
          <Button disabled={isDeletingBooking}>
            Delete booking
          </Button>
        </Modal.Open>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="page-delete-booking">
        <ConfirmDelete
          resourceName="booking"
          disabled={isDeletingBooking}
          onConfirm={() => deleteBooking(id, { onSuccess: () => navigate(-1)})}
        />

      </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
