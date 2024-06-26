import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
  const { name, image, price, recipe,_id } = item;
  console.log(item);
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [,refetch] = useCart();
  const handleAddToCart=()=>{
    if(user && user.email){
      //  send cart item to the database
      // console.log(user.email,food);
      const cartItem = {
        menuId:_id,
       email:user.email,
       name,image,price
      }
      axiosSecure.post('/carts',cartItem)
      .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          // refetch  cart to updated the cart items count
          refetch(); 
        }
      })
    }
    else{
      Swal.fire({
        title: "please Login to add to the cart?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
         navigate("/login",{state:{from:location}});
        }
      });
    }
  }
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <p
          className="bg-slate-900 text-white absolute right-0
  mr-4 mt-4 px-4"
        >
          ${price}
        </p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={handleAddToCart} className="btn bg-slate-100 border-0 border-b-4 border-orange-400 text-orange-400">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const FoodCard = ({ item }) => {
//   const { name, image, price, recipe, _id } = item;
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosSecure = useAxiosSecure();

//   const handleAddToCart = food => {
//     if (user && user.email) {
//       // TODO: send cart item to the database
//       const cartItem = {
//         menuId: _id,
//         email: user.email,
//         name,
//         image,
//         price
//       };

//       axiosSecure.post('/carts', cartItem)
//         .then(res => {
//           if (res.data.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: `${name} added to your cart`,
//               showConfirmButton: false,
//               timer: 1500
//             });
//           }
//         });
//     } else {
//       Swal.fire({
//         title: "Please Login to add to the cart",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, Login!"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login", { state: { from: location } });
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <div className="card card-compact w-96 bg-base-100 shadow-xl">
//         <figure>
//           <img src={image} alt={name} />
//         </figure>
//         <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">
//           ${price}
//         </p>
//         <div className="card-body flex flex-col items-center">
//           <h2 className="card-title">{name}</h2>
//           <p>{recipe}</p>
//           <div className="card-actions justify-end">
//             <button
//               onClick={() => handleAddToCart(item)}
//               className="btn bg-slate-100 border-0 border-b-4 border-orange-400 text-orange-400"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;
