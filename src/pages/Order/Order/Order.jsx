import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cover from "../../../Shared/Cover/Cover";
import orderCover from "../../../assets/shop/banner2.jpg";
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import OrderTab from "./OrderTab";

const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const desert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover img={orderCover} title={"Order food"}></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
           <OrderTab
           items={salad}
           >
           </OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
           items={pizza}
           >
           </OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
           items={soup}
           >
           </OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
           items={desert}
           >
           </OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab
           items={drinks}
           >
           </OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
