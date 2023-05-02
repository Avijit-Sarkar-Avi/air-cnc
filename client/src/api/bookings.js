//Save a booking
export const saveBooking = async bookingData => {
    const url = `${process.env.REACT_APP_API_URL}/bookings`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    })

    const data = await response.json()

    return data
}

//Get All Bookings for user
export const getAllBooking = async email => {
    const url = `${process.env.REACT_APP_API_URL}/bookings?email=${email}`

    const response = await fetch(url)

    const data = await response.json()

    return data
}

//Get All Bookings for Admin


//Cancel a booking