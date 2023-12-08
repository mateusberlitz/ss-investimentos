import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface IconTitleItemProps {
    title: string;
    icon?: ReactNode;
    description?: string;
    divider?: boolean;
}

export function IconTitleItem({ title, icon, description, divider = true }: IconTitleItemProps) {
    return (
        <Stack className="animatedLineItem" alignItems="flex-start"
            spacing="5" borderRadius="4" borderColor="gray.200"
            role="group">

            <HStack textAlign="left" spacing="4" bg="gray.200" p="2" borderRadius="3" _groupHover={{ bg: 'gray.300' }}>
                {icon && icon}
            </HStack>

            <Text fontSize="lg" fontWeight="bold">{title}</Text>

            {
                divider && <Box h="1px" bg="gray.700" width="100%" pos="relative">
                    <Box className="horizontalTitleLine" pos="absolute" bg="purple.500" w="25px" left="0" h="1px" />
                </Box>
            }

            {
                description && <Text fontSize="md" color="gray.700">{description}</Text>
            }
        </Stack>
    )
}
