import { Divider, Flex, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import Logo from '../../../public/logo.svg';
import { TextTag } from "../TextTag";
import { FooterLink } from "./FooterLink";

import Whatsapp from '../../../public/whatsapp.svg';
import Facebook from '../../../public/facebook.svg';
import Instagram from '../../../public/instagram.svg';
import Email from '../../../public/email.svg';
import HS from '../../../public/hs_white.svg';
import BACEN from '../../../public/abac_white.svg';
import ABAC from '../../../public/bacen_white.svg';
import Selo from '../../../public/selo.svg';
import { Box, Linkedin, MapPin } from "react-feather";

export function FooterLP(){
    return(
        <Flex flexDir="column" w="100%" bg="#0E1331" color="white" px="6">
            <Stack direction={["column", "column", "row"]} spacing={["16", "14", "12"]} w="100%" maxW="1200px" m="0 auto" py="20" justifyContent="space-between">
                <Stack direction={["column", "column", "column"]} spacing="16">
                    <Logo/>

                    <Stack spacing="4">
                        <Text fontSize={"lg"} fontWeight="normal">Venha nos visitar e tomar um café</Text>

                        <HStack>
                            <MapPin/>
                            <Text color="gray.300">Avenida Presidente Lucena 3315, sala 506, centro ivoti</Text>
                        </HStack>
                    </Stack>

                </Stack>


                <Stack spacing="16">
                    <VStack spacing={12}>
                        <Text>Corretor autorizado</Text>
                        <HS/>    
                        <HStack spacing={5}>
                            <BACEN/>
                            <ABAC/>
                        </HStack>   

                        <Selo/>            
                    </VStack>

                    
                </Stack>

                
            </Stack>

            <Stack w="100%" maxW="1200px" m="0 auto" py="20" justifyContent="space-between">
                <Divider />

                <Text>S & S SOLUCOES E INVESTIMENTOS LTDA</Text>
                <Text>CNPJ: 31.694.726/0001-03</Text>

                <Link href="/politica"><Text _hover={{textDecor:"underline"}} color="#ffffff" fontSize={"14px"}>Política de Privacidade</Text></Link>
            </Stack>

        </Flex>
    )
}