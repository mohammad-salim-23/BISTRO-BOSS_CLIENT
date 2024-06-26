import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import SocialComponent from '../../Components/SocialComponent/SocialComponent';

const Login = () => {
   const navigate = useNavigate();
   const location   = useLocation();
   const from = location.state?.from?.pathname || "/";
   console.log("state in the location login page",location.state)
    const [disabled,setDisabled] = useState(true);
    const {signIn} = useContext(AuthContext);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
      
        signIn(email,password)
        .then(result=>{
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: "User  Login Successful.",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from , {replace:true});
        })

    }
    const handleValidateCaptcha=(e)=>{
         const user_captcha_value =  e.target.value;
         if (validateCaptcha(user_captcha_value)) {
              setDisabled(false);
        }
        else{
          setDisabled(true);
        }
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | LogIn</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6 ">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card md:w-1/2  shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"
          name="email"
           placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" 
          name="password"
           placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          
          </label>
          <input 
         onBlur={handleValidateCaptcha}
           type="text" 
          name="captcha"
           placeholder="type the above captcha" className="input input-bordered"  />
        
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} className="btn bg-yellow-400" type="submit" value="Login" />
        </div>

      </form>

      
      <p className='flex items-center justify-center mb-2'><small>New here? </small> <Link  to="/signup">Create a new account</Link></p>
    
      <SocialComponent></SocialComponent>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;

