"use client";
import Modal from "./modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../Inputs/input";
import Button from "../button";
import { onClose as onCloseRegisterModal } from "@/app/store/registerModalSlice";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { postData } from "../../actions/fetchData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { setUser } from "@/app/store/userSlice";
const RegisterModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.registerModalSlice.isOpen
  );
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const validateEmail = async (email: string) => {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isValid) {
      return "Invalid email!";
    }
  };

  const onClose = () => {
    dispatch(onCloseRegisterModal());
  };
  const switchToLogin = () => {
    onClose();
    dispatch(onOpenLoginModal());
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  register("email", {
    required: { value: true, message: "You should have an email!" },
    minLength: 5,
  });
  register("username", {
    required: { value: true, message: "You should have an username!" },
    minLength: {
      value: 6,
      message: "Username should be at least 6 characters long",
    },
  });

  register("password", {
    required: { value: true, message: "You should have a password!" },
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters long",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsDisable(true);
    let res;
    try {
      res = await postData("http://localhost:8080/auth/register", {
        ...data,
      });
      if (res.type === "email") {
        setError("email", {
          type: "manual",
          message: "This email is already taken",
        });
      } else if (res.type === "username") {
        setError("username", {
          type: "manual",
          message: "This username is already taken",
        });
      }
    } catch (e) {
      console.log(e);
    }
    if (res.status === "success") {
      document.cookie = `token=${res.token}`;
      dispatch(setUser({ ...res.user }));
      router.push("/home");
      dispatch(onCloseRegisterModal());
      reset();
      toast.success("Register Successfully!!");
    }
    setIsDisable(false);
  };
  const title = <div className="text-elife-500 text-lg">Register</div>;
  const body = (
    <div className="flex flex-col justify-center items-start w-full gap-4 my-4 mb-10">
      <div className="text-elife-400 text-xl">Welcome to Elife !</div>
      <Input
        id="email"
        label="Email"
        errors={errors}
        register={register}
        required
      ></Input>
      <Input
        id="username"
        label="Username"
        errors={errors}
        register={register}
        required
      ></Input>
      <Input
        id="password"
        label="Password"
        errors={errors}
        register={register}
        type="password"
        required
      ></Input>
    </div>
  );
  const footer = (
    <div className="w-full">
      {" "}
      <Button
        onClick={handleSubmit(onSubmit)}
        label="Register"
        full={true}
      ></Button>
      <div className="mt-5 flex items-center justify-center">
        Already have an account?{" "}
        <span
          className="hover:text-blue-600 cursor-pointer text-blue-500 ml-1"
          onClick={switchToLogin}
        >
          Login now!
        </span>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      body={body}
      footer={footer}
      disabled={isDisable}
    ></Modal>
  );
};

export default RegisterModal;
