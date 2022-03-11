import { RecoilRoot } from "recoil";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="max-w-md m-auto">
        <Nav />
        <h1 className="text-4xl text-center mb-10">칼로리 체커</h1>
        <div>{children}</div>
      </div>
    </RecoilRoot>
  );
};

export default Layout;
