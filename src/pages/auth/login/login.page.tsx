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

interface ICredentials {
  email: string | null;
  password: string | null;
}

const UserLoginDTO = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ "string.base": "Email cannot be empty" }),
  Password: Joi.string().required(),
});

const LoginPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    } as ICredentials,
    resolver: joiResolver(UserLoginDTO),
  });

  const [data] = useState(
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae quo voluptates aliquid voluptate iure quae! Dolorum dignissimos voluptatibus, veniam voluptas atque optio, officia perferendis doloremque illum consectetur accusamus corrupti."
  );
  // console.log(credential);
  const submitForm = (data: ICredentials) => {
    console.log("Submit", data);
  };

  console.log(errors);

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
              <p className="!text-white">
                {data ? (
                  data
                ) : (
                  <>
                    <div
                      role="status"
                      aria-live="polite"
                      className="max-w-sm animate-pulse"
                    >
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                )}
              </p>
            </SectionDetail>
          </div>
          <div className="flex-1">
            <div className="flex flex-col py-5 gap-5">
              <SectionTitle pageTitle="Login!!!"></SectionTitle>

              <form
                className="w-full px-5 flex flex-col gap-3"
                onSubmit={handleSubmit(submitForm)}
              >
                <div className="flex ">
                  <InputLabel>Username:</InputLabel>
                  <div className="w-full">
                    <TextInputComponent
                      control={control}
                      type={InputType.EMAIL}
                      errMsg={errors?.email?.message}
                      name="email"
                    />
                  </div>
                </div>

                <div className="flex ">
                <InputLabel>Password:</InputLabel>
                  <div className="w-full">
                    <PasswordInputComponent
                      control={control}
                      errMsg={errors?.password?.message}
                      name="password"
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <NavLink 
                  to="/forget-password"
                  className="text-teal-800 underline italic text-sm font-medium hover:cursor-pointer">
                    Forget password?
                  </NavLink>
                </div>
                <div className="flex gap-4">
                <Button htmlType="reset" variant="solid" color="red">
                  <FaTrash />
                  Cancel
                </Button>
                <Button htmlType="submit" variant="solid" className="bg-teal-700! hover:bg-teal-800! text-white!">
                  <FaPaperPlane />
                  Submit
                </Button>
                </div>
              </form>
              <p className="flex gap-1 px-5 text-sm font-medium">
                Don't have an account?
                <NavLink 
                to="/register"
                className="text-teal-800 underline italic hover:cursor-pointer">
                  Sign up here!
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
