import { ChakraProps, Stack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps extends StackProps{
    children?: ReactNode;
}

export function Container({children, ...rest}: ContainerProps){
    return(
        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="32" spacing="8" justifyContent="space-between" {...rest}>
            {children}
        </Stack>
    )
}