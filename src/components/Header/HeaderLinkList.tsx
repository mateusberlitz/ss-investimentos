import { Stack, useBreakpointValue } from "@chakra-ui/react";
import { HeaderLink } from "./HeaderLink";

interface HeaderLinkListProps{
    whiteVersion?: boolean;
}

export function HeaderLinkList({whiteVersion}: HeaderLinkListProps){
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return(
        <>
            <Stack direction={isWideVersion ? "row" : "column"} spacing="7" color={whiteVersion ? "blue.primary" : "white"} justifyContent={isWideVersion ? "center" : "left"} alignItems={isWideVersion ? "center" : "left"}>
                <HeaderLink href="/">Home</HeaderLink>
                <HeaderLink href="/#sobre">Sobre</HeaderLink>
                <HeaderLink href="/#solucoes">Soluções</HeaderLink>
                <HeaderLink href="/#clientes">Clientes</HeaderLink>
                <HeaderLink href="contempladas">Contempladas</HeaderLink>
                <HeaderLink href="blog">Blog</HeaderLink>
                <HeaderLink href="/#contato">Contato</HeaderLink>

                {/* <Button rightIcon={<Icon as={ChevronDown} />} fontWeight="regular" variant="ghost" color="gray.600" _hover={{bg: "transparent", color:"white"}}>Idioma: PT</Button>
                <OutlineButton size="lg">Iniciar Projeto</OutlineButton> */}
            </Stack>
        </>
    )
}