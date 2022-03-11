import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../atoms";
import Calculate from "../components/Calculate";
import Login from "../components/Login";
import { auth } from "../firebase";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isLoggedin, setIsLoggedIn] = useRecoilState(isLoggedInState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("index user");
        console.log(user);
        const userCopy = JSON.parse(JSON.stringify(user));
        console.log("index copy user");
        console.log(userCopy);
        setUser(userCopy);
        setIsLoggedIn(true);
        // ...
      } else {
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Home | Diet</title>
        <meta name="description" content="diet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{isLoggedin ? <Calculate /> : <Login />}</main>
    </div>
  );
}

// export const getServerSideProps = (context) => {
//   console.log(context);
//   return {
//     props: {},
//   };
// };
