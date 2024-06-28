import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../../Shared/Cover/Cover'
import menuImg from "../../../assets/menu/banner3.jpg"
import PopularMenu from '../../Home/PopularMenu/PopularMenu'

const Menu = () => {
  return (
    <div>
        <Helmet>
            <title>Bistro Boss | Menu</title>
        </Helmet>
        <Cover img={menuImg} title="our menu"></Cover>
        <PopularMenu></PopularMenu>
        <h3>Menu</h3>
    </div>
  )
}

export default Menu