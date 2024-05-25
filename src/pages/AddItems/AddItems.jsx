import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <SectionTitle
        heading="add an item"
        subHeading="What's new"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <div className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
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
            <select
            {...register("category",{ required: true})}
            className="select select-bordered w-full "
          >
          <option disabled selected>
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
            {...register('recipe',{ required: true})}
             className="textarea" placeholder="Details"></textarea>
          </div>
          <div className="form-control w-full my-6">
           
          <input {...register('image',{ required: true})}
           type="file" className="file-input w-full max-w-xs" />
         
          </div>
          <input type="submit" />
          
        </form>
      </div>
    </div>
  );
};

export default AddItems;
