// src/components/Posts/NewPostForm.tsx
import { Post, postState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Alert, AlertIcon, AlertTitle, Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import TabItem from "./TabItem";

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

type NewPostFormProps = {
  user: User;
  // communityId: string;
  // communityImageURL?: string;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({ title: "", body: "" });
  const { selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const setPostItems = useSetRecoilState(postState);
  const communityId = params.communityId;

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteCount: 0,
      createdAt: serverTimestamp() as Timestamp,
      editedAt: serverTimestamp() as Timestamp,
    }

    setLoading(true)
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      await updateDoc(postDocRef, { id: postDocRef.id });

      // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, { imageURL: downloadURL });
      } 

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));

      // redirect user back to where they came from 
      router.back();
    } catch (error) {
      console.log("handleCreatePost error", error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%"> {/* Form Item Type Selection Navbar */}
        {formTabs.map((item, index) => (
          <TabItem
            key={index} 
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}> {/* Form Inputs */}
        {selectedTab === "Post" && (
          <TextInputs 
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectFile}
          />
        )}
      </Flex>
      {error && ( 
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Error creating post</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;