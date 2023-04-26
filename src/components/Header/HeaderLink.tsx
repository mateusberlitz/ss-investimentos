import { Box, ChakraProps, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

import styles from './header.module.css'

interface HeaderLinkProps extends ChakraProps{
    children: ReactNode;
    href: string;
}

export function HeaderLink({children, href, ...rest}: HeaderLinkProps){
    return(
        <Link href={href}>
            <Stack className={styles.headerLink} pt="3">
                <Text fontWeight={"light"} fontSize={["sm", "sm", "sm", "sm", "md"]} {...rest}>{children}</Text>
                <Box h="1px" w="100%" bg="gradient"/>
            </Stack>
        </Link>
    )
}