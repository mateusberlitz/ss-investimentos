import { callWhatsapp } from "@/functions/callWhatsapp";
import { ChakraProps, Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import { MainButton } from "../Buttons/MainButton";

interface ServiceItemProps extends ChakraProps{
    title: string;
    subtitle: string;
    children: string;
    cover: string;
    callText?: string;
    active?: boolean;
}

export function ServiceItem({title, subtitle, children, cover, callText, active = false, ...rest}: ServiceItemProps){
    const isWideVersion = useBreakpointValue({
        base: false,
        "2xl": true,
    });

    // const callConsultant = () => {
    //     window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada.`, '_blank');
    // }

    return(
        <Flex bg={`url(${cover})`} backgroundSize="cover" pos="relative" backgroundPosition="0 0px" h="100%" cursor={"pointer"} {...rest}>
            {/* <Flex pos="absolute" top="0" bottom="0" left="0" right="0" w={isWideVersion && active ? "500px" : "300px"}>
                <Image src={cover} alt={title} width={isWideVersion ? 500 : 300} height={400}/>
            </Flex> */}
            <Stack role="group" w={isWideVersion && active ? "500px" : "300px"} h="100%" bg="rgba(45,50,80,0.7)"  p="8" pos="relative" _hover={{w:"500px", transitionDelay: "0s"}} transition={"all 0.5s ease 0.5s"}>
                <Text fontSize={"2xl"} maxW="230px" >{title}</Text>
                <Text transform={"rotate(-90deg)"} transformOrigin="left center" w="fit-content" pos="absolute" left="38px" bottom="0" right="0" top="360px" height="28px" _before={{content: '""', pos:"absolute", display: "block", width: "100%", height: "1px", bg: "gradient", bottom: "0", left:"0", right:"0"}} textTransform="uppercase" letterSpacing={"0.1em"} fontSize="sm">
                    {subtitle}
                </Text>
                <Text fontSize={"md"} pl="14" opacity={isWideVersion && active ? "1" : "0"} marginTop={isWideVersion && active ? "70px !important" : "120px !important"} _groupHover={{opacity: 1, marginTop: "70px !important", transitionDelay: "0.5s"}} transition={"all 0.5s ease 0s"}>
                    {children}
                </Text>
                <MainButton onClick={() => callWhatsapp(callText)} maxW="calc(100% - 50px)" size="sm" ml="14 !important" mt="30px !important" opacity={isWideVersion && active ? "1" : "0"} _groupHover={{opacity: 1, transitionDelay: "0.5s"}} transition={"all .5s ease 0s"}>Falar com especialista</MainButton>
            </Stack>
        </Flex>
    )
}