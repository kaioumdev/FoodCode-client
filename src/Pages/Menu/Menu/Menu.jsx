import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../../Shared/Cover/Cover'
import menuImg from "../../../assets/menu/banner3.jpg"
import useMenu from '../../../hooks/useMenu'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import MenuCategory from '../MenuCategory/MenuCategory'
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === 'dessert');
  const salad = menu.filter((item) => item.category === 'salad');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const offered = menu.filter((item) => item.category === 'offered');


  return (
    <div>
        <Helmet>
            <title>Bistro Boss | Menu</title>
        </Helmet>
        <Cover img={menuImg} title="Our Menu"></Cover>
        <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
        <MenuCategory title="Desserts" items={desserts} img={dessertImg}></MenuCategory>
    </div>
  )
}

export default Menu