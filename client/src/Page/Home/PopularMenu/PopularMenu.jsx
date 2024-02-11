import { useEffect, useState } from "react";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import MenuItem from "../../Share/MenuItem/MenuItem";

const PopularMenu = () => {
    const [popularMenu, setPopularMenu] = useState([])

    useEffect( () => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popularItem = data.filter( item => item.category === 'popular')
            setPopularMenu(popularItem)
        })
    }, [])

    return (
        <section className="max-w-screen-xl mx-auto">
            <SectionHeading
            heading = "From Our Menu"
            subHeading="Popular Items"
            ></SectionHeading>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                {
                    popularMenu.map(item => <MenuItem
                    key={item._id} item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;