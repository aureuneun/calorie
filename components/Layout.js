import { RecoilRoot } from "recoil";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="max-w-xs min-h-screen m-auto">
        <Nav />
        <h1 className="text-4xl text-center mb-10">Calories</h1>
        <div>{children}</div>
      </div>
    </RecoilRoot>
  );
};

export default Layout;
