import { Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { Edit3 } from "react-feather";

interface VerticalStepProps{
    children?: ReactNode;
    title: string;
    icon?: ElementType;
    iconColor?: string;
}

export default function VerticalStep({title, children, icon, iconColor} : VerticalStepProps){
    const lineRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(false);

    useEffect(() => {
        if(lineRef?.current?.getBoundingClientRect().top){
            if(lineRef?.current?.getBoundingClientRect().top < 180){
                setActive(true);
            }else{
                setActive(false);
            }
        }
        //setLineParentHeight(lineRef?.current?.clientHeight ? lineRef?.current?.clientHeight : 0);
        //console.log(lineRef?.current?.clientHeight);
    });

    return(
        <HStack ref={lineRef} spacing="6" p={12} pl="1" justifyContent="space-between" borderBottom="1px solid" borderColor="gray.200">
            <Flex alignSelf="flex-start" zIndex="2" p="3" bg="gray.200" marginLeft="-30px" h="60px" w="60px" alignItems="center">
                <Icon as={icon} color={active ? "blue.primary" : "black"} w="40px" h="25px" />
            </Flex>

            <Stack spacing="6">
                <Text fontSize="4xl">{title}</Text>

                <Text>{children}</Text>
            </Stack>
        </HStack>
    )
}