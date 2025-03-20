import { Controller } from "react-hook-form";
import { Input } from "antd";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export enum InputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  URL = "url",
}

export interface ITextInputProps {
  control: any;
  errMsg?: string | null;
  name: string;
  type?: InputType;
}
export const TextInputComponent = ({
  control,
  errMsg = "",
  name,
  type = InputType.TEXT,
}: ITextInputProps) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Input
              {...field}
              type={type}
              status={errMsg ? "error" : ""}
              placeholder={`Enter your ${name}`}
            />
            <span className="text-red-800 text-xs italic">{errMsg}</span>
          </>
        )}
      />
    </>
  );
};

export const PasswordInputComponent = ({
    control,
    errMsg = "",
    name
  }: ITextInputProps) => {
    return (
      <>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <Input.Password
                {...field}
                iconRender={(visible) => 
                    visible ? <AiFillEye /> : <AiFillEyeInvisible />
                }
                status={errMsg ? "error" : ""}
                placeholder={`Enter your ${name}`}
              />
              <span className="text-red-800 text-xs italic">{errMsg}</span>
            </>
          )}
        />
      </>
    );
  };

export interface IInputLable {
    lableFor?:string,
    children:any,
    classes?: string
}
export const InputLabel = ({lableFor='',children,classes='w-1/3'}: IInputLable) => {
  return (
    <>
      <label className={classes} htmlFor={lableFor}>
        {children}
      </label>
    </>
  );
};
