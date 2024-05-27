import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.  VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key }`

const UpdateItem = () => {
    const {name,category,recipe,price,_id} = useLoaderData();
    const item = useLoaderData();
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure  = useAxiosSecure();
    console.log(item);
    const onSubmit = async(data) => {
        console.log(data);
        // image upload to imgbb and then get an url
        const imageFile = {image:data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{
          'content-type':'multipart/form-data',
        }
      });
      if(res.data.success){
        // now send the menu item data to the server with the imageURL
        const menuItem = {
          name:data.name,
          category :data.category,
          price:parseFloat(data.price),
          recipe:data.recipe,
          image:res.data.data.display_url,
        }
       
        const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem);
        console.log(menuRes.data);
        if(menuRes.data.modifiedCount>0){
          // show success popup
        //   reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is updated to the menu`,
            showConfirmButton: false,
            timer: 1500
          });
        }
    
      }
    
      console.log("with image_url",res.data);
    
      };
    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh Info">

            </SectionTitle>
            <div>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
            defaultValue={name}
              type="text"
              placeholder="Recipe Name"
              {...register('name')}

              className="input input-bordered w-full "
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select defaultValue={category}
            {...register("category",{ required: true})}
            className="select select-bordered w-full "
          >
          <option disabled value="default">
            Select a category
          </option>
          <option value="salad">Salad</option>
          <option value="pizza">pizza</option>
          <option value="soup">soup</option>
          <option value="dessert">dessert</option>
          <option value="drinks">drinks</option>
          </select>
          </div>
            {/* price */}
            <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
             defaultValue={price}
              type="number"
              placeholder="Price"
              {...register('price',{ required: true})}
              className="input input-bordered w-full "
            />
          </div>
          </div>
          <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
             defaultValue={recipe}
            {...register('recipe',{ required: true})}
             className="textarea" placeholder="Details"></textarea>
          </div>
          <div className="form-control w-full my-6">
           
          <input {...register('image',{ required: true})}
           type="file" className="file-input w-full max-w-xs" />
         
          </div>
          {/* <input type="submit" /> */}
          <button className="btn">
            Update Menu Item
          </button>
        </form>
      </div>
        </div>
    );
};

export default UpdateItem;