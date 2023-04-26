import { Text, ChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ColoredTagProps extends ChakraProps{
    children?: ReactNode;
}

export function ColoredTag({children, ...rest} : ColoredTagProps){
    return (
        <Text textTransform="uppercase" letterSpacing="0.2em" fontWeight="regular" fontSize="md" color="gray.700" {...rest} bg="linear-gradient(90deg, #3BA1F0 -1.31%, #7260DF 91.65%);" backgroundClip={"text"} __css={{webkitTextFillColor: "transparent"}}>
            {children}
        </Text>
    )
}