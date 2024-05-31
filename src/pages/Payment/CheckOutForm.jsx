import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CheckOutForm = () => {
   const [error,setError] = useState('');
   const[transictionId,setTransictionId] = useState('');
   const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [cart,refetch] = useCart();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    useEffect(() => {
       
           if(totalPrice>0){
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
           }
        

    }, [axiosSecure, totalPrice])
    const handleSubmit=async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card===null){
            return;
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card,
        });
        if(error){
            console.log('payment error', error);
            setError(error.message);
        }
        else{
            console.log('payment method',paymentMethod);
            setError('');
        }

        // confirm payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card:card,
            billing_details:{
              email: user?.email || 'anonymous',
              name:user?.displayName || 'annonymous'
            }
          }
        })

       if(confirmError){
        console.log("confirm error");
       }else{
        console.log("Payment Intent",paymentIntent);
        if(paymentIntent.status==='succeeded'){
          console.log('transaction id',paymentIntent.id);
          setTransictionId(paymentIntent.id);

          // now save the payment in the database
          const payment={
            email:user.email,
            price:totalPrice,
            transactionId:paymentIntent.id,
            date:new Date(), // utc date convert. use moment js to
            cartIds: cart.map(item=>item._id),
            menuItemIds: cart.map(item=>item.menuId),
            status:'pending'
          }

          const res = await axiosSecure.post('/payments',payment);
          if(res?.data?.paymentResult?.insertedId){
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "THank you for the taka poysa",
              showConfirmButton: false,
              timer: 1500
            });
            navigate(`/dashboard/paymentHistory`)
          }
         
          
        }
       }

    }
    return (
        <form onSubmit={handleSubmit}> 
         <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm bg-orange-400 my-5" type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className="text-red-500">{error || !clientSecret}</p>
      {transictionId && <p className="text-green-600">Your transaction id:{transictionId}</p>}
        </form>

    );
};

export default CheckOutForm;