import { useForm } from "react-hook-form";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }

        // image upload to imagebb and get an url
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            // now sent the menu item data with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: data.price,
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // admin can add item
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log("with image url", res.data);
    }

    return (
        <div>
            <SectionHeading heading={'add an item'} subHeading="What's new?"></SectionHeading>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full" />
                    </label>
                    <div className="flex gap-6 mb-6">

                        {/* category */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category Name*</span>
                            </div>
                            <select
                                defaultValue='default'
                                className="select select-bordered w-full"
                                {...register("category", { required: true })}>
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* price */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Price......$"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>
                        </div>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details..."></textarea>
                    </label>

                    {/* image input */}
                    <div className="form-control w-full my-6">
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs" />
                    </div>

                    {/* submit btn */}
                    <button className="btn bg-orange-500 text-white">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;