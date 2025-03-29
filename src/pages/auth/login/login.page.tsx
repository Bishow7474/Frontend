import "../../../assets/css/main.css";
import SectionTitle from "../../../components/section/title/section-title.component";
import SectionDetail from "../../../components/section/detail/section-detail.component";
import { useContext } from "react";
import { getGreetingMessage, setLocalStroage } from "../../../utilities/helpers";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { InputLabel, InputType, PasswordInputComponent, TextInputComponent } from "../../../components/form/input.component";
import { Button } from "antd";
import { FaPaperPlane, FaTrash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import authSvc from "../../../services/Auth.service";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth.context";

interface ICredentials {
  email: string;
  password: string;
}

const UserLoginDTO = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.base": "Email cannot be empty",
  }),
  password: Joi.string().required(),
});

const LoginPage = () => {
  const { setLoggedInUser } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ICredentials>({
    defaultValues: { email: "", password: "" },
    resolver: joiResolver(UserLoginDTO),
  });

  const submitForm = async (data: ICredentials) => {
    console.log("Submitting Data:", data);
    try {
      const responseData: any = await authSvc.postRequest("/auth/login", data);
      console.log("Login Response:", responseData);
  
      if (!responseData?.data?.token) {
        throw new Error("No token received from server");
      }
  
      setLocalStroage("token", responseData.data.token);
      
      const response: any = await authSvc.getRequest("/auth/me");
      console.log("User Data Response:", response);
  
      toast.success(responseData.message);
      setLoggedInUser(response.data);
      navigate("/" + response.data.role);
    } catch (exception: any) {
      console.error("Login Error:", exception);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (exception?.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (exception?.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (exception?.data?.message) {
        errorMessage = exception.data.message;
      }
  
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className="flex w-full justify-center lg:w-1/2 lg:mx-auto lg:my-auto lg:h-screen lg:items-center">
      <div className="flex border border-teal-950">
        <div className="bg-teal-950 text-white p-10 hidden lg:flex-1 lg:block text-center">
          <SectionTitle pageTitle="Welcome!!!" classes="!text-teal-50" subTitle={getGreetingMessage()} />
          <SectionDetail>
            <p className="!text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </SectionDetail>
        </div>
        <div className="flex-1">
          <div className="flex flex-col py-5 gap-5">
            <SectionTitle pageTitle="Login!!!" />
            <form className="w-full px-5 flex flex-col gap-3" onSubmit={handleSubmit(submitForm)}>
              <div className="flex">
                <InputLabel>Username:</InputLabel>
                <div className="w-full">
                  <TextInputComponent control={control} type={InputType.EMAIL} errMsg={errors?.email?.message} name="email" />
                </div>
              </div>
              <div className="flex">
                <InputLabel>Password:</InputLabel>
                <div className="w-full">
                  <PasswordInputComponent control={control} errMsg={errors?.password?.message} name="password" />
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <NavLink to="/forget-password" className="text-teal-800 underline italic text-sm font-medium hover:cursor-pointer">
                  Forget password?
                </NavLink>
              </div>
              <div className="flex gap-4">
                <Button htmlType="reset" className="bg-red-500 text-white">
                  <FaTrash /> Cancel
                </Button>
                <Button htmlType="submit" className="bg-teal-700 hover:bg-teal-800 text-white">
                  <FaPaperPlane /> Submit
                </Button>
              </div>
            </form>
            <p className="flex gap-1 px-5 text-sm font-medium">
              Don't have an account?
              <NavLink to="/register" className="text-teal-800 underline italic hover:cursor-pointer">
                Sign up here!
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
