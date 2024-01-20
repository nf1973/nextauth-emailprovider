//import UserForm from "../(components)/UserForm";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const CreateUser = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      {/* <UserForm /> */}
      <h1>Create users here</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default CreateUser;
