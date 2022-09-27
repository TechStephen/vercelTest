import { NextPage } from "next";
import Link from "next/link";

const Nav: NextPage = () => {
  return (
    <div className="w-screen h-[8vh] flex flex-row gap-x-16 bg-gray-200">
      <Link href="/">
        <a className="text-2xl uppercase relative ml-16 mt-5 hover:text-white">
          Home
        </a>
      </Link>
      <Link href="/Posts/allPosts">
        <a className="text-2xl uppercase relative ml-16 mt-5 hover:text-white">
          Posts
        </a>
      </Link>
      <Link href="/Create">
        <a className="text-2xl uppercase relative ml-16 mt-5 hover:text-white">
          Create
        </a>
      </Link>
    </div>
  );
};

export default Nav;
