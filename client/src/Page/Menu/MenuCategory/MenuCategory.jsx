import { Link } from "react-router-dom";
import PrimaryBtn from "../../../Components/PrimaryBtn/PrimaryBtn";
import Cover from "../../Share/Cover/Cover";
import MenuItem from "../../Share/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title, subTitle }) => {
    return (
        <div>
            {title && <Cover
                img={coverImg}
                title={title}
                subTitle={subTitle}
            ></Cover>}
            <div className="mt-24 grid md:grid-cols-2 gap-8 mb-20 max-w-screen-xl mx-auto">
                {
                    items.map(item => <MenuItem
                        key={item._id} item={item}
                    ></MenuItem>)
                }
            </div>
            {
                title && <div className='text-center mb-16'>
                    <Link to={`/shop/${title}`}><PrimaryBtn>Order Your Favorite Food</PrimaryBtn></Link>
                </div>
            }
        </div>
    );
};

export default MenuCategory;