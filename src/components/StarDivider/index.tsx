import { Text, ChakraProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StarDividerProps extends ChakraProps{
    children?: ReactNode;
}

export function StarDivider({children, ...rest} : StarDividerProps){
    return (
        <Flex w="100%" h="1px" bg="linear-gradient(90deg, #3BA1F0 -1.31%, #7260DF 91.65%)" {...rest}/>
    )
}