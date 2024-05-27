import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div>
            <SectionTitle heading="payment" subHeading="Please pay to eat"></SectionTitle>
            <div>
               <Elements stripe ={stripePromise}>
              <CheckOutForm></CheckOutForm>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;