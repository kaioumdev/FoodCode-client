import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../Shared/Cover/Cover'
import cotactIMg from '../../assets/contact/banner.jpg'
const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <title>FoodCode | Contact Us</title>
            </Helmet>
            <Cover img={cotactIMg} title="Contact Us"></Cover>
        </div>
    )
}

export default ContactUs