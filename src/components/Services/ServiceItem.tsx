import { Flex, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { MainButton } from "../Buttons/MainButton";

interface ServiceItemProps{
    title: string;
    subtitle: string;
    children: string;
    cover: string;
    active?: boolean;
}

export function ServiceItem({title, subtitle, children, cover, active = false}: ServiceItemProps){
    const isWideVersion = useBreakpointValue({
        base: false,
        "2xl": true,
    });

    return(
        <Flex bg={`url(${cover})`} backgroundSize="cover" backgroundPosition="0 0px" h="100%" cursor={"pointer"}>
            <Stack role="group" w={isWideVersion && active ? "500px" : "300px"} bg="rgba(45,50,80,0.7)"  p="8" pos="relative" _hover={{w:"500px", transitionDelay: "0s"}} transition={"all 0.5s ease 0.5s"}>
                <Text fontSize={"2xl"} maxW="230px" >{title}</Text>
                <Text transform={"rotate(-90deg)"} transformOrigin="left center" w="fit-content" pos="absolute" left="38px" bottom="0" right="0" top="360px" height="28px" _before={{content: '""', pos:"absolute", display: "block", width: "100%", height: "1px", bg: "gradient", bottom: "0", left:"0", right:"0"}} textTransform="uppercase" letterSpacing={"0.1em"} fontSize="sm">
                    {subtitle}
                </Text>
                <Text fontSize={"md"} pl="14" opacity={isWideVersion && active ? "1" : "0"} marginTop={isWideVersion && active ? "70px !important" : "120px !important"} _groupHover={{opacity: 1, marginTop: "70px !important", transitionDelay: "0.5s"}} transition={"all 0.5s ease 0s"}>
                    {children}
                </Text>
                <MainButton maxW="calc(100% - 50px)" size="sm" ml="14 !important" mt="30px !important" opacity={isWideVersion && active ? "1" : "0"} _groupHover={{opacity: 1, transitionDelay: "0.5s"}} transition={"all .5s ease 0s"}>Falar com especialista</MainButton>
            </Stack>
        </Flex>
    )
}