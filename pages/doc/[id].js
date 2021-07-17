import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router"
import { firestore } from '../../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { getSession, useSession, signOut } from 'next-auth/client'
import Login from "../../components/Login";
import { useState, useEffect, useRef } from 'react';
import TextEditor from "../../components/TextEditor";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";


function Doc() {
  const [session] = useSession();
  if (!session) return <Login />;

  const menu = useRef();
  const router = useRouter();
  const { id } = router.query
  const docRef = firestore.collection("userDocs").doc(session.user.email).collection("docs").doc(id);
  const [snapshot, loadingSnapshot] = useDocumentOnce(docRef);
  const [input, setInput] = useState('');
  useEffect(
    () => {
      setInput(snapshot?.data()?.fileName);
    },
    [snapshot?.data()?.fileName] // run when remoteName changes
  );

  const onChangeTitle = (e) => {
    setInput(e.target.value)
    docRef.set({
      fileName: e.target.value,
    }, { merge: true })
  }

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }


  return (
    <div>
      <header className="flex justify-between items-center p-1 md:p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="description" size="6xl" color="blue" />
        </span>
        <div className="flex-grow flex-col">
          <input type="text" value={input || ''} className="mt-3 w-4/5 md:w-2/5 xl:w-1/5 text-xl hover:outline-blue relative px-2 outline-none m-0 focus:outline-blue" onChange={onChangeTitle} />
          <div className="flex pt-1 items-center text-sm -mx-1 text-gray-600 h-10 space-x-1">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="hidden md:inline-flex option">Tools</p>
          </div>
        </div>
        <Button
          color="blue"
          size="sm"
          buttonType="fill"
          ripple="dark"
          className="mr-2 md:mr-0 !p-2 md:!px-5"
          onClick={(e) => { e.stopPropagation() }}
        > <Icon name="people" size="md" />
          <span className="hidden md:inline-flex ml-0 p-0">Share</span>
        </Button>
        <img
          ref={menu}
          loading="lazy"
          className="hidden md:inline-flex cursor-pointer h-12 w-12 rounded-full mx-2 hover:shadow-md"
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
      <TextEditor />
    </div >
  )
}

export default Doc


export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}