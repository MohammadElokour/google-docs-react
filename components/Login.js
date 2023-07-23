import { signIn } from "next-auth/client";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F9FA]">
      <div className="shadow-md flex flex-col items-center justify-center p-10 rounded-lg bg-white">
        <div className="icon-container select-none">
          <Icon name="description" size="12rem" color="blue" />
        </div>
        <h1 className="text-gray-600 text-3xl -mt-3 font-semibold subpixel-antialiased select-none">
          Google Docs
        </h1>
        <Button
          color="blue"
          buttonType="fill"
          size="regular"
          block={false}
          iconOnly={false}
          ripple="light"
          className="w-44 mt-7"
          onClick={signIn}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
