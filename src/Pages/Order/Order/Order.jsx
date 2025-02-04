import { useState } from "react";
import shopImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const categories = ["salads", "pizzas", "soups", "desserts", "drinks", "offered"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  // Filtering menu items based on category
  const desserts = menu.filter((item) => item.category === "dessert");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  const soups = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      <Helmet>
        <title>FoodCode | Order</title>
      </Helmet>
      <Cover img={shopImg} title="Order Shop" />

      {/* Tabs Section */}
      <div className="flex justify-center mt-6">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2">
            {categories.map((cat, index) => (
              <Tab
                key={index}
                className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200 transition"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <OrderTab items={salads} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizzas} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={soups} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={desserts} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={offered} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
