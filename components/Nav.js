import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { initState, userState } from "../atoms";
import { auth } from "../firebase";

const Nav = () => {
  const [user, setUser] = useRecoilState(userState);
  const [init, setInit] = useRecoilState(initState);
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
        // ...
      } else {
        setUser(null);
      }
      setInit(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <nav className="flex justify-around py-5 mb-20">
      <Link href={"/"}>
        <a className="hover:text-sky-400">Home</a>
      </Link>
      <Link href={"/about"}>
        <a className="hover:text-sky-400">About</a>
      </Link>
    </nav>
  );
};

export default Nav;
