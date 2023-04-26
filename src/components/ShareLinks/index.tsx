import { HStack, Icon, Link, Stack, Text } from "@chakra-ui/react";

import { Facebook, Twitter } from 'react-feather';
import { socialShareLink } from "../../utils/SocialShareLinks";

interface ShareLinkProps{
    url: string;
}

export function ShareLinks({url}: ShareLinkProps){
    return (
        <Stack borderLeft="1px solid" borderColor="red.400" px="4" py="1">
            <Text color="gray.800">Compartilhe:</Text>

            <HStack spacing="5">
                <Link target="_blank" href={`${socialShareLink.facebook.shareUrl}${url}`}>
                    <Icon as={Facebook} stroke="#444" fill="none" w="19px" h="19px" strokeWidth="2"/>
                </Link>

                <Link target="_blank" href={`${socialShareLink.twitter.shareUrl}${url}`}>
                    <Icon as={Twitter} stroke="#444" fill="none" w="19px" h="19px" strokeWidth="2"/>
                </Link>
            </HStack>
        </Stack>
    )
}