import React, { Fragment, useContext, useState } from 'react';
import { Tab } from '@headlessui/react'
import ReviewHouse from '../Components/CheckOut/ReviewHouse'
import CheckoutCart from '../Components/CheckOut/CheckoutCart'
import WhosComing from '../Components/CheckOut/WhosComing'
import Payment from '../Components/CheckOut/Payment'
import { AuthContext } from '../contexts/AuthProvider'

const Checkout = () => {
    const { user } = useContext(AuthContext)
    const homeData = {
        _id: '60ehjhedhjdj3434',
        location: 'Dhaka, Bangladesh',
        title: 'Huge Apartment with 4 bedrooms',
        image: 'https://i.ibb.co/YPXktqs/Homel.jpg',
        from: '17/02/2023',
        to: '21/02/2023',
        host: {
            name: 'Jhon Doe',
            image: 'https://i.ibb.co/6JM5VJF/photo-1633332755192-727a05c4013d.jpg',
            email: 'johndoe@gmail.com',
        },
        price: 98,
        total_guest: 4,
        bedrooms: 2,
        bathrooms: 2,
        ratings: 4.8,
        reviews: 64,
    }

    const [bookingData, setBookingData] = useState({
        homeId: homeData._id,
        hostEmail: homeData?.host.email,
        message: '',
        totalPrice: parseFloat(homeData.price) + 31,
        guestEmail: user?.email
    })

    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleBooking = () => {
        console.log(bookingData);
    }


    return (
        <div className='md:flex gap-5 items-start justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-4'>
            {/*Details */}
            <div className='flex-1'>
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                    defaultIndex={1}
                >
                    <Tab.List>
                        <div className='container flex flex-wrap items-center py-4 mx-auto overflow-y-auto'>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        1. Reviews house rules
                                    </button>
                                )}
                            </Tab>
                            <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        2. Who's coming?
                                    </button>
                                )}
                            </Tab>
                            <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        3. Confirm and pay
                                    </button>
                                )}
                            </Tab>
                            <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ReviewHouse setSelectedIndex={setSelectedIndex} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <WhosComing
                                setSelectedIndex={setSelectedIndex}
                                host={homeData?.host}
                                bookingData={bookingData}
                                setBookingData={setBookingData}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Payment handleBooking={handleBooking} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            <CheckoutCart data={homeData} />
        </div>
    );
};

export default Checkout;