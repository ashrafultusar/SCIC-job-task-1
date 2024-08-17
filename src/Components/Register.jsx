import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser,signInGoogle } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
    });
    navigate("/");
  };

  // google signin
  const googleSignIn =async () => {
    try {
      await signInGoogle()
      navigate('/')
     

    } catch (err) {
      // 
      // console.log(err)
    
    }
  }

  return (
    <div>
      <Helmet>
        <title>EchoMart | Register</title>
      </Helmet>

      <div
        data-aos="fade-up"
        className="flex justify-center items-center mt-4 mb-6 px-2"
      >
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-whiteM">
          <div className="mb-6 text-center">
            <h1 className="my-3 text-4xl font-bold ">Register IN</h1>
            <p className="text-sm text-redM">Sign up to access your account</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  id="email"
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500"> password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500"> password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500">
                    {" "}
                    password must be less then 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    {" "}
                    password must have one uppercase one lower case and one
                    special characters
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group mt-2 w-full rounded-md relative z-10 px-6 py-3 overflow-hidden bg-green-500 text-base text-black"
              >
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-gray-400 transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                  Sign In
                </span>
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-8 mb-6">
            <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>

            <div className="text-xs text-center text-greenM uppercase ">or</div>

            <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>
          </div>

          <button
            //   disabled={loading}
            //   onClick={handleGoogleSignIn}
            onClick={googleSignIn}
            className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 hover:border-redM transition border-rounded cursor-pointer"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </button>

          <p className="px-6 text-sm text-center mt-2 text-gray-400">
            Already have an account
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-redM"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
