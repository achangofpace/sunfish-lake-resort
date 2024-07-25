import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { DEMO_EMAIL, PAGE_SIZE } from "../utils/constants";
import { getCurrentUser } from "./apiAuth";

async function isDemoUser() {
  const currUser = await getCurrentUser();
  if (currUser.email === DEMO_EMAIL) {
    return true;
  }
  return false;
}

export async function getBookings({ filter, sortBy, page }) {
  const isDemo = await isDemoUser();
  const bookings_table = `bookings${isDemo ? "_demo" : ""}`;
  const select_string = `id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins${isDemo ? "_demo" : ""}(name), guests${isDemo ? "_demo" : ""}(fullName, email)`
  let query = supabase
    .from(bookings_table)
    .select(
      select_string,
      { count: "exact" }
    );

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc"});
  }

  if (page) {
    const from = (page-1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to)
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const isDemo = await isDemoUser();
  const bookings_table = `bookings${isDemo ? "_demo" : ""}`;
  const { data, error } = await supabase
    .from(bookings_table)
    .select(`*, cabins${isDemo ? "_demo" : ""}(*), guests${isDemo ? "_demo" : ""}(*)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
// date should be an ISOString
export async function getBookingsAfterDate(date) {
  const isDemo = await isDemoUser();
  const bookings_table = isDemo ? "bookings_demo" : "bookings";
  const { data, error } = await supabase
    .from(bookings_table)
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
// (stays being booking that have already begun (checked in) at time of lookup)
export async function getStaysAfterDate(date) {
  const isDemo = await isDemoUser();
  const bookings_table = isDemo ? "bookings_demo" : "bookings";
  const { data, error } = await supabase
    .from(bookings_table)
    .select(`*, guests${isDemo ? "_demo" : ""}(fullName)`)
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const isDemo = await isDemoUser();
  const bookings_table = isDemo ? "bookings_demo" : "bookings";
  const { data, error } = await supabase
    .from(bookings_table)
    .select(`*, guests${isDemo ? "_demo" : ""}(fullName, nationality, countryFlag)`)
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const isDemo = await isDemoUser();
  const bookings_table = isDemo ? "bookings_demo" : "bookings";
  const { data, error } = await supabase
    .from(bookings_table)
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  const isDemo = await isDemoUser();
  const bookings_table = isDemo ? "bookings_demo" : "bookings";
  const { data, error } = await supabase
    .from(bookings_table)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
