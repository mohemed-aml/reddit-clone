// src/components/Layout/PageContent.tsx
"use client"
import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode[];
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Flex justify='center' p='16px 0px'>
      <Flex width='95%' justify='center' maxWidth='860px'>

        {/* LHS */}
        <Flex
          direction='column'
          width={{ base:'100%', md:'65%' }}
          mr={{ base:0, md:6 }}
        >
          {childrenArray[0]}
        </Flex>

        
        {/* RHS */}
        <Flex
          direction='column'
          display={{ base:'none', md:'flex' }}
          flexGrow={1}
        >
          {childrenArray[1]}  
        </Flex>

      </Flex>
    </Flex>
  )
};
export default PageContent;