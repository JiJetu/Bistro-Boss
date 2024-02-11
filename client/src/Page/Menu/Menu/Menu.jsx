import { Helmet } from 'react-helmet-async';
import Cover from '../../Share/Cover/Cover';
import menuCover from '../../../../assets/menu/banner3.jpg'
import UseMenu from '../../../hooks/UseMenu';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertImg from '../../../../assets/menu/dessert-bg.jpeg'
import PizzaImg from '../../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../../assets/menu/soup-bg.jpg'
import drinksImg from '../../../../assets/home/chef-service.jpg'

const Menu = () => {
    const [menu] = UseMenu();
    const salad = menu.filter(item => item.category === "salad")
    const dessert = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const drinks = menu.filter(item => item.category === "drinks")
    const soup = menu.filter(item => item.category === "soup")
    const offered = menu.filter(item => item.category === "offered")
    return (
        <div>
            {/* set helmet for dynamic title */}
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            {/* menu banner/cover section */}
            <Cover
                img={menuCover}
                title={"Our Menu"}
                subTitle={"Would you like to try our dish?"}
            ></Cover>

            {/* offered section */}
            <section>
                <SectionHeading
                    subHeading={"Don't Miss"}
                    heading={"Today's Offer"}
                ></SectionHeading>
                <MenuCategory
                    items={offered}
                ></MenuCategory>
            </section>

            {/* Dessert section */}
            <section>
                <MenuCategory
                    items={dessert}
                    coverImg={dessertImg}
                    title={'Dessert'}
                    subTitle={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint illo dicta ab ea minus inventore.'}
                ></MenuCategory>
            </section>

            {/* pizza section */}
            <section>
                <MenuCategory
                    items={pizza}
                    coverImg={PizzaImg}
                    title={'pizza'}
                    subTitle={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint illo dicta ab ea minus inventore.'}
                ></MenuCategory>
            </section>

            {/* salad section */}
            <section>
                <MenuCategory
                    items={salad}
                    coverImg={saladImg}
                    title={'salad'}
                    subTitle={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint illo dicta ab ea minus inventore.'}
                ></MenuCategory>
            </section>

            {/* soup section */}
            <section>
                <MenuCategory
                    items={soup}
                    coverImg={soupImg}
                    title={'soup'}
                    subTitle={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint illo dicta ab ea minus inventore.'}
                ></MenuCategory>
            </section>

            {/* soup section */}
            <section>
                <MenuCategory
                    items={drinks}
                    coverImg={drinksImg}
                    title={'drinks'}
                    subTitle={'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint illo dicta ab ea minus inventore.'}
                ></MenuCategory>
            </section>
        </div>
    );
};

export default Menu;