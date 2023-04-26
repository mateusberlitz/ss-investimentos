import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

import Logo from '../../../public/logo.svg';
import { TextTag } from "../TextTag";
import { FooterLink } from "./FooterLink";

import Whatsapp from '../../../public/whatsapp.svg';
import Facebook from '../../../public/facebook.svg';
import Instagram from '../../../public/instagram.svg';
import Email from '../../../public/email.svg';
import HS from '../../../public/hs_white.svg';
import Selo from '../../../public/selo.svg';

export function Footer(){
    return(
        <Flex flexDir="column" w="100%" bg="#0E1331" color="white" px="6">
            <Stack direction={["column", "column", "row"]} spacing={["16", "14", "12"]} w="100%" maxW="1200px" m="0 auto" py="20" justifyContent="space-between">
                <Stack direction={["column", "column", "column"]} spacing="16">
                    <Logo/>

                    <Stack spacing="4">
                        <Text fontSize={"lg"} fontWeight="normal">Venha nos visitar e tomar um café</Text>

                        <Text color="gray.300">Av. Castelo Branco, 58, Centro, Novo Hamburgo - RS, 93510-310</Text>
                    </Stack>

                    <Stack spacing="4">
                        <Text fontSize={"lg"} fontWeight="normal">Esteja conectado conosco</Text>
                        <HStack spacing="6">
                            <Link href=""><Whatsapp/></Link>
                            <Link href=""><Facebook/></Link>
                            <Link href=""><Instagram/></Link>
                            <Link href=""><Email/></Link>
                        </HStack>
                    </Stack>
                </Stack>

                <Stack direction={["row", "row", "row"]} justifyContent="space-between">
                    <Stack spacing="6">
                        <Text fontWeight={"normal"} fontSize={"lg"}>Acesso Rápido</Text>

                        <Stack spacing="4" fontSize="sm">
                            <FooterLink href="https://usa.lanceconsorcio.com.br/florida" >Imóveis na Flórida</FooterLink>
                            <FooterLink href="/vender">Vender consórcio</FooterLink>
                            <FooterLink href="https://www.hsconsorcios.com.br/cliente/declaracao-imposto-renda">Declaração de IR</FooterLink>
                            <FooterLink href="https://www.hsconsorcios.com.br/cliente/boleto">2ª Via do Boleto</FooterLink>
                            {/* <FooterLink href="https://old.lanceconsorcio.com.br/cliente">Área do cliente</FooterLink> */}
                            <FooterLink href="/contempladas">Contempladas</FooterLink>
                        </Stack>
                    </Stack>

                    <Stack spacing="6">
                        <Text fontWeight={"normal"} fontSize={"lg"}>Soluções</Text>

                        <Stack spacing="4" fontSize="sm">
                            <FooterLink href="https://usa.lanceconsorcio.com.br/florida" >Imóveis na Flórida</FooterLink>
                            <FooterLink href="/vender">Vender consórcio</FooterLink>
                            <FooterLink href="https://www.hsconsorcios.com.br/cliente/declaracao-imposto-renda">Declaração de IR</FooterLink>
                            <FooterLink href="https://www.hsconsorcios.com.br/cliente/boleto">2ª Via do Boleto</FooterLink>
                            {/* <FooterLink href="https://old.lanceconsorcio.com.br/cliente">Área do cliente</FooterLink> */}
                            <FooterLink href="/contempladas">Contempladas</FooterLink>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing="16">
                    <Flex>
                        <HS/>
                    </Flex>

                    <Selo/>
                </Stack>
            </Stack>
        </Flex>
    )
}