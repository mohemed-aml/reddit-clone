// src/components/Posts/PostForm/TextInputs.tsx
import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

type TextInputsProps = {
  textInputs: { title: string; body: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input name="title" fontSize="10pt" borderRadius={4} placeholder="Title" value={textInputs.title}
        onChange={onChange} _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }} />
      <Textarea name="body" fontSize="10pt" placeholder="Body" height="100px"
        value={textInputs.body} onChange={onChange} _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }} />
      <Flex justify="flex-end">
        <Button height="34px" padding="0px 30px" disabled={!textInputs.title}
          isLoading={loading} onClick={() => {}} >
          Save Draft
        </Button>
        <Button height="34px" padding="0px 30px" disabled={!textInputs.title}
          isLoading={loading} onClick={handleCreatePost} >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;