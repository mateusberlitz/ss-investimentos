import { callWhatsapp } from "@/functions/callWhatsapp";
import { ChakraProps, Flex, HStack, Icon, IconButton, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { MainButton } from "../Buttons/MainButton";

interface ServiceItemProps extends ChakraProps{
    title: string;
    subtitle: string;
    children: string;
    cover: string;
    callText?: string;
}

export function ServiceItemMobile({title, subtitle, children, callText, cover, ...rest}: ServiceItemProps){
    const isWideVersion = useBreakpointValue({
        base: false,
        "2xl": true,
    });

    // const callConsultant = () => {
    //     window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada.`, '_blank');
    // }

    const [active, setActive] = useState(false);

    return(
        <Flex bg={`url(${cover})`} onClick={() => setActive(!active)} backgroundSize="cover" backgroundPosition="0 0px" cursor={"pointer"} {...rest} transition={"all ease 0.5s"}>
            <Stack w={"100%"} bg="rgba(45,50,80,0.7)" h={active ? "500px" : "140px"} spacing="10" p="8" pos="relative" transition={"all ease 0.5s"}>
                <HStack justifyContent={"space-between"}>
                    <Text fontSize={"2xl"} maxW="160px">{title}</Text>
                    <IconButton onClick={() => setActive(!active)} icon={<Icon as={ChevronDown} fontSize="35px" transform={active ? "rotate(180deg)" : "rotate(0deg)"} transition={"all ease 0.5s"}/>} aria-label="Ver mais" bg="transparent" _focus={{bg:"rgba(255,255,255,0.2)"}} _active={{bg:"rgba(255,255,255,0.2)"}}/>
                </HStack>
                <Stack spacing="10">
                {/* display={active ? "flex" : "none"} */}
                    <Text fontSize={"md"} pl="0" transition={"all ease 0.5s"}>
                        {children}
                    </Text>
                    <MainButton onClick={() => callWhatsapp(callText)} size="sm" transition={"all .5s ease 0s"}>Falar com especialista</MainButton>
                </Stack>
            </Stack>
        </Flex>
    )
}