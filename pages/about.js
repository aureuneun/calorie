import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { initState, userState } from "../atoms";
import Init from "../components/Init";
import { auth, getUser } from "../firebase";
import Nutrient from "../components/Nutrient";

const About = () => {
  const [user, setUser] = useRecoilState(userState);
  const [init, setInit] = useRecoilState(initState);
  const [docs, setDocs] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (Boolean(user)) {
      console.log("ok user");
      getUser().then((docs) =>
        docs.forEach((doc) => {
          console.log(doc.data().uid, user.uid);
          console.log(doc.data().uid, user.uid);
          console.log(doc.data().uid, user.uid);
          console.log(doc.data().uid, user.uid);
          if (doc.data().uid === user.uid) {
            setDocs((prev) => {
              if (prev.find((ele) => ele.id === doc.id)) {
                return [...prev];
              }
              return [...prev, { ...doc.data(), id: doc.id }];
            });
          }
        })
      );
    }
  }, [user]);
  return (
    <div>
      <Head>
        <title>About | Diet</title>
        <meta name="description" content="Lose weight" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {init ? (
          <>
            <button
              onClick={async () => {
                console.log(user);
                await auth.signOut();
                router.push("/");
              }}
            >
              {user?.email || "Anon"}
            </button>
            <div className="mt-10">
              {/* <table>
                <caption>필요 영양소</caption>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>탄수화물 필요량</th>
                    <th>단백질 필요량</th>
                    <th>지방 필요량</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => (
                    <Nutrient key={doc.id} {...doc} />
                  ))}
                </tbody>
              </table> */}
              <div className="grid grid-cols-4 mb-2 text-xl">
                <span className="text-center">날짜</span>
                <span className="text-center">탄수화물</span>
                <span className="text-center">단백질</span>
                <span className="text-center">지방</span>
              </div>
              {docs.map((doc) => (
                <Nutrient key={doc.id} {...doc} />
              ))}
            </div>
          </>
        ) : (
          <Init />
        )}
      </main>
    </div>
  );
};

export default About;

// export const getServerSideProps = () => {
//   return {
//     props: {
//       id: "hello",
//     },
//   };
// };
