import { ChakraProps, Flex, Img, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MainButton } from "../Buttons/MainButton";
import { SolidButton } from "../Buttons/SolidButton";

interface TopCardProps extends ChakraProps{
    title: string;
    text: string;
    href?: string;
    imgUrl?: string;
}

export function TopCard({title, text, imgUrl, href, ...rest} : TopCardProps){
    const router = useRouter();

    return (
        <Flex flexDir="column" overflow="hidden" borderRadius="6" w={["100%", "100%", "33.33%"]} justifyContent="space-between" {...rest}>

              <Stack spacing="4" p="6">
                <Text fontWeight="semibold">{title}</Text>

                <Text fontWeight="normal">{text}</Text>

                <MainButton size="sm" onClick={() => {href && router.push(href)}}>
                  Ver mais
                </MainButton>
              </Stack>

              <Flex w="100%">
                  <Img src={imgUrl} alt={title}/>
              </Flex>

        </Flex>
    )
}