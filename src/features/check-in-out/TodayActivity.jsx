import styled from "styled-components";
import { format } from "date-fns";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

import useTodayActivity from "./useTodayActivity";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { todayActiveStays, isPending: isLoadingTodayActiveStays } = useTodayActivity();

  // function conditionalSpinner() {
  //   if (isLoadingTodayActiveStays) {
  //     return <Spinner />;
  //   }
  // }

  // function conditionalNoActivity() {
  //   if (todayActiveStays.length === 0) {
  //     return <NoActivity>No check-ins or checkouts planned for today</NoActivity>
  //   }
  // }

  return (
    <StyledToday>
      <Heading as="h2">Today ({format(new Date(), "MMM dd yyyy")})</Heading>
      <Row type="horizontal">
        {/* {conditionalSpinner()} */}
        {/* {conditionalNoActivity()} */}
        {isLoadingTodayActiveStays && <Spinner />}
        {!isLoadingTodayActiveStays && todayActiveStays.length === 0 && <NoActivity>No check-ins or checkouts planned for today</NoActivity>}
        {!isLoadingTodayActiveStays && todayActiveStays.length > 0 && (
          <TodayList>
            {todayActiveStays.map((stay) => (
              <TodayItem key={stay.id} stay={stay} />
            ))}
          </TodayList>
        )}
      </Row>
    </StyledToday>
  );
}

export default TodayActivity;
