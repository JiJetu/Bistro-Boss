import { Elements } from "@stripe/react-stripe-js";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import CheckoutFrom from "./CheckoutFrom";
import { loadStripe } from "@stripe/stripe-js";


// added stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <SectionHeading heading={'Payment'} subHeading={'Please Pay to eat'}></SectionHeading>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;