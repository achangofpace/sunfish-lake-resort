# AUTH
    users of the app are hotel employees -> authentication
    new users can only be signed up inside the apps -> auth only through this app
    users control their own photo, name, and password


# BOOKINGS
    a table that displays all cabins
        - photos
        - names
        - capacities
        - prices
        - offers
    users should be able to update or delete a cabin and create a new cabin with a photo

    app needs a table view to show bookings
        - arrival and departure dates
        - status
        - paid amount
        - cabin
        - guests
            # of guests
            number of nights
            guest observations
            breakfast booked
            breakfast price
            full name
            email
            national ID
            nationality
            country flag

    should be able to filter the table by booking statuses
        - confirmed (i.e. booked but not check in)
        - checked in
        - checked out

# FRONT DESK
    users should be able to crd bookings
    users need to be able receive payment by check-in and confirm that payment was received
    users should be able to add breakfast for guests on check in if desired

# DASHBOARD
    dashboard with information for the last 7, 30, or 90 days
        list of guests checking in/out on current day, should be able to check guests in and out from dashboard
        stats on recent bookings/sales/check-ins/occupancy
        a chart of all daily hotel sales (total and extras (breakfasts))
        a chart with stats on stay durations

# SETTINGS
    dark mode



/login
/dashboard
/bookings
/cabins
/account
/settings
/users
/checkin/:bookingID

global remote state

supabase

CSR vs SSR ?
SPA vs MPA
download javascript vs download less javascript
internal vs external
React Router
Styled components (not tailwind?)
react query
context API for UI state
form management library React Hook Form