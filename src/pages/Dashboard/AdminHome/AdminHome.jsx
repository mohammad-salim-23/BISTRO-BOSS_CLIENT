import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaJediOrder, FaUser } from "react-icons/fa";


const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:stats} = useQuery({
        queryKey:['admin-stats'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })
    return (
        <div>
            <h3 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                user?.displayName ? user.displayName:'Back'
            }
            </h3>
            <div className="stats shadow">
  
  <div className="stat place-items-center">
    <div className="stat-title">Revenue</div>
    <div className="stat-value">{stats.revenue}</div>
    <div className="stat-desc">From January 1st to February 1st</div>
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Users</div>
    <div className="stat-value text-secondary flex gap-3">{stats.users}
    <FaUser className="text-3xl"></FaUser>
    </div>
  
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">Orders</div>
    <div className="stat-value text-secondary flex gap-3">
      
        {stats.orders}   <FaJediOrder className="text-3xl"></FaJediOrder>
        </div>
  
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{stats.menuItems}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>
         
        </div>
    );
};

export default AdminHome;

