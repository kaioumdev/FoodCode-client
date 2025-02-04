import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../Shared/Cover/Cover'
import cotactIMg from '../../assets/contact/banner.jpg'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <title>FoodCode | Contact Us</title>
            </Helmet>
            <Cover img={cotactIMg} title="Contact Us"></Cover>
            <SectionTitle heading={"Our Location"} subHeading={"Visit Us"}></SectionTitle>
        </div>
    )
}

export default ContactUs