import { Link } from "react-router-dom";
import { login } from "../utils/login";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 items-center justify-between p-2 w-full h-screen bg-background">
      <div className="w-full text-left">
        <h1 className="text-3xl font-bold">Login</h1>
        <p>Welcome back! Please login to continue.</p>
      </div>
      <form onSubmit={login} className="flex flex-col gap-4 w-11/12 mx-auto">
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
