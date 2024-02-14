import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";

const FoodCart = ({ item }) => {
    const { name, image, price, recipe } = item;
    const {user} = UseAuth();
    const navigate = useNavigate();

    const handleAddToCart = food => {
        console.log(food);
        if(user && user.email){
            // todo: add to cart
        }
        else{
            Swal.fire({
                title: "You are not login!!",
                text: "Please login to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send to user to login
                    navigate('/login')
                }
            });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt={name} /></figure>
            <p className="absolute right-0 mt-4 mr-5 bg-black bg-opacity-90 px-6 py-2 text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn bg-slate-200 btn-outline border-0 border-b-4 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;