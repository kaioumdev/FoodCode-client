import React, { useState } from "react";
import shopImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FoodCard from "../../../components/FoodCard/FoodCard";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";

const Order = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    const desserts = menu.filter((item) => item.category === 'dessert');
    const salads = menu.filter((item) => item.category === 'salad');
    const pizzas = menu.filter((item) => item.category === 'pizza');
    const drinks = menu.filter((item) => item.category === 'drinks');
    const soups = menu.filter((item) => item.category === 'soup');
  return (
    <div>
      <Cover img={shopImg} title="Order Shop"></Cover>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
            <OrderTab items={salads}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={pizzas}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={soups}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
