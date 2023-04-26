import { ChakraProps, Flex, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BoardProps extends ChakraProps{
    tag?: 'flex' | 'grid';
    children: ReactNode;
}

export function Board({ tag = 'grid', children, ...rest } : BoardProps){
    return tag === 'flex' ? (
        <Flex bg="white" boxShadow="sm" p="9" borderRadius="4px"  {...rest}>
            {children}
        </Flex>
    ): (
        <GridItem bg="white" boxShadow="sm" p="9" borderRadius="4px" {...rest}>
            {children}
        </GridItem>
    );
}