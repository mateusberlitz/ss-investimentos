import { MainButton } from "@/components/Buttons/MainButton";
import { OutlineButton } from "@/components/Buttons/OutlineButton";
import { Flex, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function chat(){
    return(
        <Stack w={"100%"} h="100vh" spacing="0">
            <HStack bg="blue.primary" w="100%" py="3" justifyContent={"center"}>
                <Flex justifyContent={"center"} maxW="">
                    <Link href="/">
                        <OutlineButton borderColor="rgba(255,255,255,0.1)" color="gray.500" _hover={{borderColor: "white", color: "white"}}>Ver Site Completo</OutlineButton>
                    </Link>
                </Flex>
            </HStack>
            <iframe
            src="https://viewer.typebot.io/ss-investimentos-geral-ubgdnz8" height={"100%"} width={"100%"}></iframe>
        </Stack>
    )
}