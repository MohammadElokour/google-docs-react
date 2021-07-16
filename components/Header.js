import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from 'next-auth/client'
import { useRef } from "react";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";

function Header() {
  const [session] = useSession();
  const menu = useRef();

  return (
    <header className="flex items-center h-20 sticky top-0 z-50 px-1 md:px-4 shadow-md bg-white">
      <Button
        color="gray"
        buttonType="outline"
        size="regular"
        rounded={true}
        block={false}
        iconOnly={true}
        ripple="dark"
        className="hidden lg:inline-flex !border-0 h-20 w-20 m-1"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Button
        color="gray"
        buttonType="outline"
        size="xl"
        rounded={true}
        block={false}
        iconOnly={true}
        ripple="none"
        className="!border-0 h-20 w-10 m-1 hover:bg-transparent"
      >
        <Icon name="description" size="5xl" color="blue" />
      </Button>
      <h1 className="ml-0 md:ml-1 text-xl md:text-2xl text-gray-700">Docs</h1>
      <div className="flex flex-grow items-center mx-2 lg:mx-20 py-2 px-2 md:px-5 bg-gray-100 text-gray-500 rounded-lg focus-within:shadow-md focus-within:text-gray-700 focus-within:bg-white focus-within:border">
        <Icon name="search" size="3xl" color="gray"></Icon>
        <input type="text" className="w-10 pl-2 flex-grow bg-transparent outline-none"></input>
      </div>
      <Button
        color="gray"
        buttonType="outline"
        size="regular"
        rounded={true}
        block={false}
        iconOnly={true}
        ripple="dark"
        className="hidden lg:inline-flex !border-0 h-20 w-20 m-1"
      >
        <Icon name="apps" size="3xl" />
      </Button>
      <img
        ref={menu}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full mx-2 hover:shadow-md"
        src={session?.user?.image}
      />
      <Popover placement="bottom" ref={menu}>
        <PopoverContainer className="shadow-md">
          <PopoverBody className="!p-0">
            <Button
              color="blue"
              buttonType="link"
              ripple="dark"
              size="sm"
              className="border-2"
              onClick={signOut}
            ><Icon name="logout" size="2xl" /> Logout
            </Button>
          </PopoverBody>
        </PopoverContainer>
      </Popover>

    </header>
  );
}

export default Header;
