import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BoardProps extends ButtonProps{
    children?: ReactNode;
}

export function EditButton({children, size = "sm", ...rest } : BoardProps){
    return (
        <Button {...rest} h="38px" colorScheme="yellow" color="white" w="fit-content" pl="4" pr="4" fontWeight="600" variant="solid" size={size} fontSize="12px">
            Alterar
            {children}
        </Button>
    )
}