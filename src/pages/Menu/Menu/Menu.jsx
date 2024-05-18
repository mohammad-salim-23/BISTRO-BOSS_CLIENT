import { Helmet } from "react-helmet";
import Cover from "../../../Shared/Cover/Cover";
import img from "../../../assets/menu/banner3.jpg";
import desertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
const Menu = () => {
  const [menu] = useMenu();
  const desert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={img} title={"Our Menu"}></Cover>
      {/* main cover */}
      <SectionTitle
        heading={"Today's Offer"}
        subHeading={"Don't Miss"}
      ></SectionTitle>
      {/* Offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* desert menu items */}
      <MenuCategory
        items={desert}
        title={"dessert"}
        img={desertImg}
      ></MenuCategory>
      <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
      <MenuCategory  items={salad} title={"salad"} img={saladImg}></MenuCategory>
      <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;
// import { Helmet } from 'react-helmet-async';

// import menuImg from '../../../assets/menu/banner3.jpg'
// import soupImg from '../../../assets/menu/soup-bg.jpg'
// import saladImg from '../../../assets/menu/salad-bg.jpg'
// import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
// import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
// import useMenu from '../../../hooks/useMenu';

// import MenuCategory from '../MenuCategory/MenuCategory';
// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// import Cover from '../../../Shared/Cover/Cover';


// const Menu = () => {
//     const [menu] = useMenu();
//     const desserts = menu.filter(item => item.category === 'dessert');
//     const soup = menu.filter(item => item.category === 'soup');
//     const salad = menu.filter(item => item.category === 'salad');
//     const pizza = menu.filter(item => item.category === 'pizza');
//     const offered = menu.filter(item => item.category === 'offered');
//     return (
//         <div>
//             <Helmet>
//                 <title>Bistro Boss | Menu</title>
//             </Helmet>
//             <Cover img={menuImg} title="our menu"></Cover>
//             {/* main cover */}
//             <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
//             {/* offered menu items */}
//             <MenuCategory items={offered}></MenuCategory>
//             {/* dessert menu items  */}
//             <MenuCategory items={desserts} title="dessert" img={dessertImg}></MenuCategory>
//             <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
//             <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
//             <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
//         </div>
//     );
// };

// export default Menu;
