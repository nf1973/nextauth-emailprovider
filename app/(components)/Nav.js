import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  console.log("Logging from app/(components)/Nav.js", session);
  return (
    <header className="bg-slate-700 text-slate-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>
          <Link href="/">My Site</Link>
        </div>
        <div className="flex gap-10">
          <Link href="/createuser">Create User</Link>
          <Link href="/clientmember">Client Member</Link>
          <Link href="/member">Member</Link>
          <Link href="/public">Public</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
