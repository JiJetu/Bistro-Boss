import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import featuredImg from '../../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <section className="py-12 featured bg-fixed my-20">
            <SectionHeading
                heading={'FROM OUR MENU'}
                subHeading={'Check it out'}
                style = {`style={{color: "white"}}`}
            ></SectionHeading>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-8 md:px-32 md:pb-12">
                <div className="flex-1">
                    <img className="w-full" src={featuredImg} alt="" />
                </div>
                <div className="text-white text-center md:text-start flex-1 space-y-3">
                    <p>March 20, 2023</p>
                    <h3 className="uppercase text-lg">
                        WHERE CAN I GET SOME?
                    </h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;