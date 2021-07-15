import { signIn } from 'next-auth/client'
import Button from "@material-tailwind/react/Button";
import Image from "next/image"

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image src="https://www.securedsigning.com/products/img/googleDocLogo.png" height="200" width="400" objectFit="contain" />
      <Button
        color="blue"
        buttonType="fill"
        block={false}
        iconOnly={false}
        ripple="light"
        className="w-44 mt-7"
        onClick={signIn}
      > Login
      </Button>
    </div>
  )
}

export default Login
