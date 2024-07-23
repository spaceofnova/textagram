import { Link } from "react-router-dom";
import { register } from "../utils/login";

export default function Signup() {
  return (
    <div className="flex flex-col gap-4 items-center justify-between p-2 w-full h-screen bg-background">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p>Welcome! Please create an account to continue.</p>
      </div>
      <form onSubmit={register} className="flex flex-col gap-4 w-11/12 mx-auto">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded-md border border-primary"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded-md border border-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded-md border border-primary"
        />
        <button className="w-full p-2 rounded-md border border-primary">
          Login
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
