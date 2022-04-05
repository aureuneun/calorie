import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import { addUser, auth, db } from "../firebase";
import FormError from "./FormError";

const Calculate = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onValid = async (data) => {
    const { bmr, weight, bodyfat, type, gender, spend } = data;
    let carbohydrateCalorie;
    let proteinCalorie;
    let fatCalorie;
    let carbohydrateNutrient;
    let proteinNutrient;
    let fatNutrient;

    const q = query(
      collection(db, "nutrientratio"),
      where("gender", "==", gender),
      where("type", "==", type)
    );
    const rate = await getDocs(q);

    rate.docs.forEach((doc) => {
      console.log(
        doc.data().carbohydrate,
        doc.data().protein,
        doc.data().fat,
        doc.data().purpose
      );
      console.log("==========================================");
      const active = (bmr * spend) / 100;
      const burned = ((bmr + active) * doc.data().purpose) / 100;
      const intake = bmr + active + burned;
      carbohydrateCalorie = (intake * doc.data().carbohydrate) / 100;
      proteinCalorie = (intake * doc.data().protein) / 100;
      fatCalorie = (intake * doc.data().fat) / 100;
      console.log(carbohydrateCalorie);
      console.log(proteinCalorie);
      console.log(fatCalorie);
      console.log("==========================================");
      carbohydrateNutrient = carbohydrateCalorie / 4;
      proteinNutrient = proteinCalorie / 4;
      fatNutrient = fatCalorie / 9;
      console.log(carbohydrateNutrient);
      console.log(proteinNutrient);
      console.log(fatNutrient);
    });

    // 1. 필요영양소열량= ((기초대사량 + 활동대사량 - 다이어트+린매스/벌크업) Ⅹ 운동목적에 따른 영양소 비율)
    // 2. 필요영양소 = 필요영양소 열량 / 영양소 열량 (고정 탄 4 / 단 4 / 지 9)

    console.log("==========================================");
    if (bodyfat > 25) {
      console.log(weight * (1 - bodyfat / 100) * 1.25 * 2);
    } else {
      console.log(weight * 2);
    }
    console.log("==========================================");
    addUser({
      uid: user.uid,
      ...data,
      carbohydrateNutrient,
      proteinNutrient,
      fatNutrient,
    });
    router.push("/about");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col mb-14 mt-10"
      >
        <select {...register("gender")}>
          <option value="none">Gender (성별)</option>
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
            valueAsNumber: true,
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
            valueAsNumber: true,
            pattern: {
              value: /^[0-9]{1,3}\.[0-9]$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.weight && <FormError message={errors.weight.message} />}
        <input
          type="number"
          step="1"
          max="100"
          placeholder="Skeletal muscle (골격근량)"
          {...register("skeletalmuscle", {
            required: "skeletal muscle is required.",
            valueAsNumber: true,
            pattern: {
              value: /^[0-9]{1,3}$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.skeletalmuscle && (
          <FormError message={errors.skeletalmuscle.message} />
        )}
        <input
          type="number"
          step="1"
          max="100"
          placeholder="Body fat (체지방량)"
          {...register("bodyfat", {
            required: "bodt fat is required.",
            valueAsNumber: true,
            pattern: {
              value: /^[0-9]{1,3}$/,
              message: "wrong format.",
            },
          })}
        />
        {errors.weight && <FormError message={errors.weight.message} />}
        <select {...register("type")}>
          <option value="none">Purpose (목적)</option>
          <option value="extreme">극한의 다이어트</option>
          <option value="diet">다이어트</option>
          <option value="leanmassup">린매스업</option>
          <option value="bulkup">벌크업</option>
        </select>
        <select {...register("spend", { valueAsNumber: true })}>
          <option value={0}>Activity (소모칼로리)</option>
          <option value={25}>사무직</option>
          <option value={40}>활동량이 많은 업무</option>
          <option value={65}>사무직 (퇴근 후 운동)</option>
          <option value={85}>활동량이 많은 업무(퇴근후 운동)</option>
          <option value={100}>활동량이 많은 업무(퇴근 후 격한운동)</option>
        </select>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Calculate;
