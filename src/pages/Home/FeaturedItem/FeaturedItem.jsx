
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featurImg from "../../../assets/home/featured.jpg"
import "./Featured.css"
const FeaturedItem = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
           <SectionTitle
             heading="Featured Item"
             subHeading="Check It out"
           >
            </SectionTitle> 
            <div className="md:flex pb-20 pt-12 px-36 justify-center items-center gap-7 bg-slate-500 bg-opacity-60">
                <div>
                    <img src={featurImg} alt="" />
                </div>
                <div>
                    <p>Aug 20,2029</p>
                    <p className="uppercase">where can i get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae sed, dicta harum, laudantium reiciendis voluptates iusto temporibus adipisci quos ducimus quas aperiam perferendis est commodi ex velit eos cumque, quis aspernatur officiis nam nisi hic? Eum voluptatem fugit voluptate.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-2">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;