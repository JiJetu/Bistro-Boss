
const FoodCart = ({ item }) => {
    const {name, image, price, recipe} = item
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt={name} /></figure>
            <p className="absolute right-0 mt-4 mr-5 bg-black bg-opacity-90 px-6 py-2 text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn bg-slate-200 btn-outline border-0 border-b-4 border-orange-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;