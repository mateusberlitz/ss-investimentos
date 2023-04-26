import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";

import { X } from 'react-feather';


interface BoardProps extends ButtonProps{
    children?: ReactNode;
}

export function RemoveButton({children, size = "sm", ...rest } : BoardProps){
    return (
        <Button {...rest} width="fit-content" color="red.400" fontWeight="500" variant="unstyled" size={size} fontSize="sm" pl="4" pr="4" height="38px">
            <Icon as={X} fontSize="15" stroke="#C30052" fill="none" mr="2"/>
            Remover
            {children}
        </Button>
    )
}