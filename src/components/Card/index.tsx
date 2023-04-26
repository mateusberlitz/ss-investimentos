import { ChakraProps, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MainButton } from "../Buttons/MainButton";
import { OutlineButton } from "../Buttons/OutlineButton";
import { SolidButton } from "../Buttons/SolidButton";

interface CardProps extends ChakraProps{
    title: string;
    text: string;
    hasButton?: Boolean;
    hrefArea?: Boolean;
    href?: string;
    imgUrl?: string;
    category?: string;
    description?: string;
}

export function Card({title, category, description, text, imgUrl, href, hasButton = true, hrefArea = false, ...rest} : CardProps){
    const router = useRouter();

    return (
        <Flex as="a" href={href} flexDir="column" overflow="hidden" justifyContent="space-between" {...rest}>

            <Flex w="100%" alignItems="end">
                <Img src={imgUrl} alt={title} w="100%" borderRadius="6"/>
            </Flex>

              <Stack spacing="4" pt="6">
                <Text fontWeight="light" fontSize="sm" color="gray.700" textTransform={"uppercase"}>{category}</Text>

                <Text fontSize="3xl" fontWeight={"medium"} lineHeight="1.2em">{title}</Text>

                <Text fontSize="md" fontWeight={"light"} lineHeight="">{description}</Text>
                
                <OutlineButton size="md" fontWeight={"regular"} onClick={() => {href && router.push(href)}} borderColor="rgba(67,67,67,0.6)" color="rgba(67,67,67,0.6)" _hover={{borderColor:"blue.primary", color: "blue.primary"}}>
                    Ver mais
                </OutlineButton>
              </Stack>

        </Flex>
    )
}