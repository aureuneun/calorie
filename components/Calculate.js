import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atoms";
import { auth } from "../firebase";
import FormError from "./FormError";

const Calculate = () => {
  const [user, setUser] = useRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onValid = async (data) => {
    console.log("Calculate Data");
    console.log(data);
  };
  console.log("calculate User");
  console.log(user);
  return (
    <>
      <button
        onClick={async () => {
          console.log(user);
          await auth.signOut();
          setUser(null);
          setIsLoggedIn(false);
        }}
      >
        {user?.email || "Anon"}
      </button>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col mb-14 mt-10"
      >
        <select {...register("gender")}>
          <option value="none">성별</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <input
          type="number"
          step="1"
          min="1000"
          max="5000"
          placeholder="BMR (기초대사량)"
          {...register("bmr", {
            required: "bmr is required.",
            pattern: {
              value: /^[0-9]{4,4}$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.bmr && <FormError message={errors.bmr.message} />}
        <input
          type="number"
          step="0.1"
          max="150.0"
          placeholder="Weight (체중)"
          {...register("weight", {
            required: "weight is required.",
            pattern: {
              value: /^[0-9]{1,3}\.[0-9]$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.weight && <FormError message={errors.weight.message} />}
        <select {...register("type")}>
          <option value="none">방식</option>
          <option value="diet">다이어트</option>
          <option value="leanmassup">린매스업</option>
          <option value="bulkup">벌크업</option>
        </select>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Calculate;
