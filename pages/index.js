import Head from "next/head";
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import { getSession, useSession } from "next-auth/client";
import { useRef, useState } from "react";
import firebase from "firebase";
import { firestore } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const [session] = useSession();
  if (!session) return <Login />;

  const menu = useRef();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState();
  const docRef = firestore.collection("userDocs").doc(session.user.email).collection("docs");

  const [snapshot] = useCollection(docRef.orderBy("timestamp", "desc"));

  const createDocument = () => {
    if (!input) {
      docRef.add({
        fileName: "Untitled Document",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      docRef.add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal
      size="sm"
      active={showModal}
      toggler={() => {
        setInput("");
        setShowModal(false);
      }}
    >
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full bg-gray-100 px-5 py-3 rounded-lg"
          placeholder="Untitled document"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          block={false}
          iconOnly={false}
          ripple="dark"
          onClick={() => {
            setInput("");
            setShowModal(false);
          }}
        >
          {" "}
          Cancel
        </Button>
        <Button
          color="blue"
          buttonType="fill"
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={createDocument}
        >
          {" "}
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Goggle Docs NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#F8F9FA] py-5 px-7 md:py-10 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              rounded={true}
              ripple="dark"
              className="!border-0"
              ref={menu}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
            <Popover placement="bottom" ref={menu}>
              <PopoverContainer className="border-2 shadow-md">
                <PopoverBody className="!p-0">
                  <Button
                    color="blue"
                    buttonType="link"
                    ripple="dark"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(true);
                    }}
                  >
                    <Icon name="add" size="2xl" /> Create
                  </Button>
                </PopoverBody>
              </PopoverContainer>
            </Popover>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 transition duration-100"
            >
              <img src="docs-blank.png" className="w-full" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-3xl px-5 bg-white mx-auto py-8">
          <div className="flex items-center justify-between pb-3 text-gray-700 ">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-10">Date Created</p>
            <Icon name="folder" color="gray" size="3xl" />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
