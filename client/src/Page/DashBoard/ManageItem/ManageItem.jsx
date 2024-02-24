import { FaEdit, FaTrash } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import UseMenu from "../../../hooks/UseMenu";

const ManageItem = () => {
    const [menu] = UseMenu();

    const handleUpdateItem = item => {

    }

    const handleDeleteItem = item => {

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
                                        <button
                                        onClick={() => handleUpdateItem(item)}
                                         className="btn-sm bg-orange-500 rounded-lg">
                                            <FaEdit className="text-white"></FaEdit>
                                        </button>
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