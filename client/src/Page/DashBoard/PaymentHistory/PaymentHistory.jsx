import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })


    return (
        <div>
            <SectionHeading heading={'payments history'} subHeading={'Thanks You for Your Payment'}></SectionHeading>
            <div>
                <h2 className="text-3xl">Total Payment: {payments.length}</h2>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Price</th>
                                    <th>Transaction Id</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment, index) => <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>${payment.price}</td>
                                        <td>{payment.transactionId}</td>
                                        <td>{payment.status}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;