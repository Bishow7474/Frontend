import "../../../assets/css/main.css";
import SectionTitle from "../../../components/section/title/section-title.component";
import SectionDetail from "../../../components/section/detail/section-detail.component";
import { useState } from "react";
import { getGreetingMessage } from "../../../utilities/helpers";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  InputLabel,
  InputType,
  PasswordInputComponent,
  TextInputComponent,
} from "../../../components/form/input.component";
import { Button } from "antd";
import { FaPaperPlane, FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router";

interface IRegisterCredentials {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: string;
  address: string;
}

const RegisterUserDTO = Joi.object({
  fullname: Joi.string().required().messages({ "string.base": "Full Name is required" }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({ "string.base": "Email is required" }),
  password: Joi.string().required().messages({ "string.base": "Password is required" }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({ "any.only": "Passwords must match" }),
  role: Joi.string().required().messages({ "string.base": "Role is required" }),
  phone: Joi.string().required().messages({ "string.base": "Phone number is required" }),
  address: Joi.string().required().messages({ "string.base": "Address is required" }),
});

const RegisterPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      phone: "",
      address: "",
    } as IRegisterCredentials,
    resolver: joiResolver(RegisterUserDTO),
  });

  const [data] = useState(
    "Join us today and start your journey on our platform! Provide your details below to create an account."
  );

  const submitForm = (data: IRegisterCredentials) => {
    console.log("Submit", data);
  };

  return (
    <>
      <div className="flex w-full justify-center lg:w-1/2 lg:mx-auto lg:my-auto lg:h-screen lg:items-center">
        <div className="flex border border-teal-950">
          <div className="bg-teal-950 text-white p-10 hidden lg:flex-1 lg:block text-center">
            <SectionTitle
              pageTitle="Welcome!!!"
              classes="!text-teal-50"
              subTitle={getGreetingMessage()}
            />
            <SectionDetail>
              <p className="!text-white">{data}</p>
            </SectionDetail>
          </div>
          <div className="flex-1">
            <div className="flex flex-col py-5 gap-5">
              <SectionTitle pageTitle="Register!!!"></SectionTitle>
              <form className="w-full px-5 flex flex-col gap-3" onSubmit={handleSubmit(submitForm)}>
                <div className="flex">
                  <InputLabel>Full Name:</InputLabel>
                  <div className="w-full">
                    <TextInputComponent control={control} type={InputType.TEXT} errMsg={errors?.fullname?.message} name="fullname" />
                  </div>
                </div>
                <div className="flex">
                  <InputLabel>Email:</InputLabel>
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
                <div className="flex">
                  <InputLabel>Confirm Password:</InputLabel>
                  <div className="w-full">
                    <PasswordInputComponent control={control} errMsg={errors?.confirmPassword?.message} name="confirmPassword" />
                  </div>
                </div>
                <div className="flex">
                  <InputLabel>Role:</InputLabel>
                  <div className="w-full">
                    <select className="border border-gray-300 rounded-md p-3" name="role">
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                      <option value="seller">Seller</option>
                    </select>
                  </div>
                </div>
                <div className="flex">
                  <InputLabel>Phone:</InputLabel>
                  <div className="w-full">
                    <TextInputComponent control={control} type={InputType.TEXT} errMsg={errors?.phone?.message} name="phone" />
                  </div>
                </div>
                <div className="flex">
                  <InputLabel>Address:</InputLabel>
                  <div className="w-full">
                    <TextInputComponent control={control} type={InputType.TEXT} errMsg={errors?.address?.message} name="address" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button htmlType="reset" variant="solid" color="red">
                    <FaTrash /> Cancel
                  </Button>
                  <Button htmlType="submit" variant="solid" className="bg-teal-700! hover:bg-teal-800! text-white!">
                    <FaPaperPlane /> Register
                  </Button>
                </div>
              </form>
              <p className="flex gap-1 px-5 text-sm font-medium">
                Already have an account?
                <NavLink to="/login" className="text-teal-800 underline italic hover:cursor-pointer">
                  Login here!
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
