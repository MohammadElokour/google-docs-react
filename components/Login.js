import { signIn } from 'next-auth/client'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#F8F9FA]">
      <div className="shadow-md flex flex-col items-center justify-center p-10 rounded-lg bg-white">
        <Icon name="description" size="9xl" color="blue" />
        <h1 className="text-gray-600 text-xl font-semibold">Google Docs</h1>
        <Button
          color="blue"
          buttonType="outline"
          size="sm"
          block={false}
          iconOnly={false}
          ripple="light"
          className="mt-5"
          onClick={signIn}
        > Login
        </Button>
      </div>
    </div>
  )
}

export default Login
