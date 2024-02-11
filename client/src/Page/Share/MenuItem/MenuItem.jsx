
const MenuItem = ({item}) => {
    const {image, name, recipe, price} = item;
    return (
        <div className="flex space-x-5">
            <img className="w-[120px] rounded-es-full rounded-ee-full rounded-se-full" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;