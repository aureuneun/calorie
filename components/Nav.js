import Link from "next/link";

const Nav = () => {
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
