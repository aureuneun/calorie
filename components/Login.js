import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms";
import { auth } from "../firebase";
import FormError from "./FormError";

const Login = () => {
  const setUser = useSetRecoilState(userState);
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onValid = async (data) => {
    const { email, password } = data;
    let userCredential;
    try {
      if (newAccount) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log("Login User");
      console.log(userCredential.user);
      // setUser(userCredential.user);
    } catch (e) {
      console.log(e.code);
      setError(e.code);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col mb-14">
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "email is required.",
            pattern: {
              value:
                /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.email && <FormError message={errors.email.message} />}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "password is required.",
            minLength: {
              value: 6,
              message: "at least 6 characters.",
            },
          })}
        />
        {errors.password && <FormError message={errors.password.message} />}
        <button>{newAccount ? "Sign up" : "Sign in"}</button>
        {error && <FormError message={error} />}
      </form>
      <button onClick={() => setNewAccount((prev) => !prev)}>
        {newAccount ? "Sign in" : "Create a new account"}
      </button>
    </>
  );
};

export default Login;
