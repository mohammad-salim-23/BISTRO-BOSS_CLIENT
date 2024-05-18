
import { Helmet } from 'react-helmet';
import Cover from '../../../Shared/Cover/Cover';
import img from "../../../assets/menu/banner3.jpg";
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover 
            image={img}
            title={"Our Menu"}
            ></Cover>
            <PopularMenu></PopularMenu>
           
            
        </div>
    );
};

export default Menu;