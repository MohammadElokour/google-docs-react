import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { firestore } from "../firebase";
import { useSession } from "next-auth/client";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), {
  ssr: false,
});

function TextEditor() {
  const [session] = useSession();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const docRef = firestore
    .collection("userDocs")
    .doc(session.user.email)
    .collection("docs")
    .doc(id);

  const [snapshot] = useDocumentOnce(docRef);

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)));
    }
  }, [snapshot]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    docRef.set(
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-12">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky md:!px-5 top-0 z-50"
        editorClassName="mt-6 bg-white shadow-lg max-w-5xl mx-2 md:mx-auto border p-10 min-h-screen"
      />
    </div>
  );
}

export default TextEditor;
