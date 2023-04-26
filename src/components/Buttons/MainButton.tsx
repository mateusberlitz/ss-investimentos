import { ButtonProps } from "@chakra-ui/react"
import { ReactNode } from "react"
import { SolidButton } from "./SolidButton"

interface MainButtonProps extends ButtonProps{
    children: string;
}

export function MainButton({children, ...rest} : MainButtonProps){
    return(
        <SolidButton size="lg" bg="gradient" color="white" fontWeight={"normal"} {...rest}>
            {children}
        </SolidButton>
    )
}