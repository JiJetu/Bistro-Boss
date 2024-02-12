import Cover from "../../Share/Cover/Cover";
import shopBannerImg from "../../../../assets/shop/banner2.jpg"
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import "./Shop.css"
import UseMenu from "../../../hooks/UseMenu";
import ShopTabs from "../../../Components/ShopTabs/ShopTabs";
import { useParams } from "react-router-dom";

const Shop = () => {
    // set category as there syntax 
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = UseMenu();
    const salad = menu.filter(item => item.category === "salad")
    const dessert = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const drinks = menu.filter(item => item.category === "drinks")
    const soup = menu.filter(item => item.category === "soup")


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Shop</title>
            </Helmet>
            {/* shop banner */}
            <Cover img={shopBannerImg} title={"Our Shop"} subTitle={"Would you like to try a dish?"}></Cover>

            {/* set tab as index */}
            <section className="my-14 max-w-screen-xl mx-auto">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <ShopTabs items={salad}></ShopTabs>
                    </TabPanel>
                    <TabPanel>
                    <ShopTabs items={pizza}></ShopTabs>
                    </TabPanel>
                    <TabPanel>
                    <ShopTabs items={soup}></ShopTabs>
                    </TabPanel>
                    <TabPanel>
                    <ShopTabs items={dessert}></ShopTabs>
                    </TabPanel>
                    <TabPanel>
                    <ShopTabs items={drinks}></ShopTabs>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    );
};

export default Shop;