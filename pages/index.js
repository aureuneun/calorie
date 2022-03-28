import Head from "next/head";
import { useRecoilState } from "recoil";
import { initState, userState } from "../atoms";
import Calculate from "../components/Calculate";
import Init from "../components/Init";
import Login from "../components/Login";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [init, setInit] = useRecoilState(initState);
  return (
    <div>
      <Head>
        <title>Home | Diet</title>
        <meta name="description" content="diet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{init ? Boolean(user) ? <Calculate /> : <Login /> : <Init />}</main>
    </div>
  );
}

// export const getServerSideProps = (context) => {
//   console.log(context);
//   return {
//     props: {},
//   };
// };
