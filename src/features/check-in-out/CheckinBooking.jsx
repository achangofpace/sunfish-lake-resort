import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isPending: isLoadingBooking, booking } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isPending: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  if (isLoadingBooking || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid || isCheckingIn) {
      return;
    }
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={()=> {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Add breakfasts for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={()=>setConfirmPaid((confirmed) => !confirmed)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I have received payment for {guests.fullName} for the total amount of {
            (!hasBreakfast && addBreakfast) ?
              `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
              :
              `${formatCurrency(totalPrice)}`
          }
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
