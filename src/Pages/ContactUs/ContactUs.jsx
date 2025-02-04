import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../Shared/Cover/Cover'
import cotactIMg from '../../assets/contact/banner.jpg'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
const ContactUs = () => {
    const infoData = [
        {
            id: 1,
            icon: <FaPhone size={24} />,
            title: "PHONE",
            details: "+38 (012) 34 56 789",
        },
        {
            id: 2,
            icon: <FaMapMarkerAlt size={24} />,
            title: "ADDRESS",
            details: "+38 (012) 34 56 789",
        },
        {
            id: 3,
            icon: <FaClock size={24} />,
            title: "WORKING HOURS",
            details: (
                <>
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 10:00 - 23:00</p>
                </>
            ),
        },
    ];

    return (
        <div>
            <Helmet>
                <title>FoodCode | Contact Us</title>
            </Helmet>
            <Cover img={cotactIMg} title="Contact Us"></Cover>
            <SectionTitle heading={"Our Location"} subHeading={"Visit Us"}></SectionTitle>
            <div className="flex flex-col md:flex-row justify-center gap-6 p-6">
                {infoData.map((item) => (
                    <div
                        key={item.id}
                        className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden text-center border"
                    >
                        <div className="bg-yellow-700 text-white py-4 flex justify-center items-center">
                            {item.icon}
                        </div>
                        <div className="p-4 bg-gray-100">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-gray-600">{item.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContactUs