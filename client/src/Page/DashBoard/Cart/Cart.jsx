import { FaTrash } from "react-icons/fa";
import UseCarts from "../../../hooks/UseCarts";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
    const [cart, refetch] = UseCarts();
    const totalPrice = cart.reduce((total, item) => (total + item.price), 0);
    const axiosSecure = UseAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-between my-10">
                <h2 className="text-5xl">Total Item: {cart.length}</h2>
                <h3 className="text-5xl">Total Price: {totalPrice.toFixed(2)}</h3>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn-lg"><FaTrash className="text-red-600"></FaTrash>
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;