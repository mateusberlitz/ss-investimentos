import { Text, ChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TextTagProps extends ChakraProps{
    children?: ReactNode;
}

export function TextTag({children, ...rest} : TextTagProps){
    return (
        <Text fontWeight="regular" fontSize="xl" color="gray.600" {...rest}>
            {children}
        </Text>
    )
}