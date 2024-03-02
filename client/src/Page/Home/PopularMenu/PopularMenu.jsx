import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import MenuItem from "../../Share/MenuItem/MenuItem";
import PrimaryBtn from "../../../Components/PrimaryBtn/PrimaryBtn";
import UseMenu from "../../../hooks/UseMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu] = UseMenu();
    const popularMenu = menu.filter(item => item.category === 'popular')

    return (
        <section className="max-w-screen-xl mx-auto">
            <SectionHeading
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionHeading>
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                {
                    popularMenu.map(item => <MenuItem
                        key={item._id} item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center mb-14">
                <Link to='/menu'>
                    <PrimaryBtn>view full menu</PrimaryBtn>
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;