import Cover from "../../../Shared/Cover/Cover";
import orderCover from "../../../assets/shop/banner2.jpg"

const Order = () => {
    return (
        <div>
            <Cover 
            image={orderCover}
            title={"Order food"}
            ></Cover>
        </div>
    );
};

export default Order;