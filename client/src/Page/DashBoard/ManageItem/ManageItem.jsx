import { FaEdit, FaTrash } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import UseMenu from "../../../hooks/UseMenu";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const ManageItem = () => {
    const [menu, , refetch] = UseMenu();
    const axiosSecure = UseAxiosSecure();


    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center-top",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });

    }

    return (
        <div>
            <SectionHeading heading='Manage Items' subHeading='Hurry up'></SectionHeading>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
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
                                    <td>${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button
                                                className="btn-sm bg-orange-500 rounded-lg">
                                                <FaEdit className="text-white"></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn-lg">
                                            <FaTrash className="text-red-600"></FaTrash>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;