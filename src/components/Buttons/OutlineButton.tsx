import { Button, ButtonProps } from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";
import { ElementType } from "react";

interface ButtonModelProps extends ButtonProps{
    icon?: ElementType;
    children: string;
}

export function OutlineButton({icon, children, ...rest} : ButtonModelProps){
    return (
        <Button px="12" w="fit-content" h="45px" leftIcon={icon && <Icon as={icon} stroke="#ffffff" fontSize="lg" fill="none" mr="2"/>} fontSize="md" fontWeight={"light"} variant="outline" borderRadius="6px" border="1px" borderColor="rgba(67,67,67,0.6)"
        _hover={{borderColor: "blue.primary", bg: "rgba(255,255,255,0.04)", color: "blue.primary"}}
        _focus={{borderColor: "blue.primary", bg: "rgba(255,255,255,0.04)", color: "blue.primary"}}
        {...rest}>
            {children}
        </Button>
    )
}