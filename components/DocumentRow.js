import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRef, useState } from "react";
import { useRouter } from "next/dist/client/router"
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useSession } from 'next-auth/client'
import { firestore } from '../firebase';


function DocumentRow({ id, fileName, date }) {
  const [session] = useSession();
  if (!session) return <Login />;

  const router = useRouter()
  const menu = useRef();
  const [showModal, setShowModal] = useState(false);
  const docRef = firestore.collection("userDocs").doc(session.user.email).collection("docs").doc(id);

  const deleteDocument = () => {
    docRef.delete();
    setShowModal(false);
  }

  const deleteModal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <h2 className="text-center font-bold">Are you sure?</h2>
      </ModalBody>
      <ModalFooter>
        <Button
          color="gray"
          buttonType="link"
          block={false}
          iconOnly={false}
          ripple="dark"
          onClick={() => setShowModal(false)}
        > Cancel
        </Button>
        <Button
          color="red"
          buttonType="fill"
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={deleteDocument}
        > Delete
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <>
      {deleteModal}
      <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer transition duration-100">
        <Icon name="article" size="3xl" color="blue" />
        <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
        <p className="pr-5">{date?.toDate().toLocaleDateString()}</p>
        <Button
          color="gray"
          buttonType="outline"
          iconOnly={true}
          rounded={true}
          ripple="dark"
          className="!border-0"
          ref={menu}
          onClick={(e) => { e.stopPropagation() }}
        >
          <Icon name="more_vert" size="3xl" />
        </Button>
        <Popover placement="bottom" ref={menu}>
          <PopoverContainer className="shadow-md">
            <PopoverBody className="!p-0">
              <Button
                color="red"
                buttonType="link"
                ripple="dark"
                size="sm"
                onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
              ><Icon name="delete" size="2xl" /> Delete
              </Button>
            </PopoverBody>
          </PopoverContainer>
        </Popover>
      </div>
    </>
  )
}

export default DocumentRow
