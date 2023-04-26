import { Button, ButtonProps } from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";
import { ElementType } from "react";

export interface ButtonModelProps extends ButtonProps{
    icon?: ElementType;
    children: string;
}

export function SolidButton({icon, children, ...rest} : ButtonModelProps){

    const boxShadowColor = (rest.colorScheme === 'red' ? "#e53e3e" : (rest.colorScheme === 'green' ? "#38a169" : (rest.colorScheme === 'blue' ? "#002d56" : ( rest.colorScheme === 'orange' ? "#dd6b20": "#222222"))));

    return (
        <Button px="8" w="fit-content" h="57px" borderRadius="5px" fontWeight="semibold" leftIcon={icon && <Icon as={icon} stroke="#ffffff" fontSize="16" fill="none" mr="2"/>} variant="solid" fontSize="18" {...rest} _hover={{boxShadow: `0 8px 20px -8px ${boxShadowColor}`}} _active={{}}>
            {children}
        </Button>
    )
}