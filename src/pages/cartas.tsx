import { Box, Button, Checkbox, filter, Flex, Heading, HStack, Icon, IconButton, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import { GetStaticProps } from "next";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MainButton } from "../components/Buttons/MainButton";
import { OutlineButton } from "../components/Buttons/OutlineButton";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import Whatsapp from '../../public/whatsapp.svg';
import { Check, ChevronRight, Download, Home, Printer, Search, X } from "react-feather";
import { SolidButton } from "../components/Buttons/SolidButton";
import Sum from "../components/Sum";
import Link from "next/link";
import ReactToPrint from "react-to-print";
import { CSVLink, CSVDownload } from "react-csv";
import Head from "next/head";
import { TextTag } from "../components/TextTag";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from 'yup';
import { ControlledInput } from "../components/Forms/Inputs/ControlledInput";
import { ControlledSelect } from "../components/Forms/Selects/ControlledSelect";
import { ControlledSlider } from "@/components/Forms/Slider/ControllerSlider";
import { serverApi } from "@/services/api";
import { useQuotas, Quota as MainQuota } from "@/contexts/useQuotas";
import { Exo_2 } from "next/font/google";
import { NaoContempladas } from "@/pageParts/NaoContempladas";
import { Contempladas } from "@/pageParts/Contempladas";
import { useSimulador } from "@/contexts/SimuladorContext";
import CartasLike from "./CartasLike";



export default function Cartas(){
   
    return (
        <Box position="relative">
            <Head>
                <title>Contempladas - S&S Investimentos</title>

                <meta name="description" content="Ofertas de crédito contemplado pronto para a utilização que é mais barato que financiamento e não contabiliza no banco."></meta>
            </Head>

            <Header whiteVersion={true} />

            <Flex flexDir="column" w="100%" px="6">
                <Stack flexDir="column" w="100%" maxW="1200px" m="0 auto" pb="2" pt="16" spacing="12" justifyContent="space-between">
                    <Stack spacing="5">
                        <HStack fontSize={"md"}>
                            <Link href="/"><Text _hover={{textDecor:"underline"}} color="rgba(67, 67, 67, 0.5)">Home</Text></Link>
                            <Text><ChevronRight color="rgba(67, 67, 67, 0.5)"/></Text>
                            <Text>Cartas Contempladas</Text>
                        </HStack>
                        <Heading fontSize={["4xl","5xl","6xl","6xl"]}>Cartas Contempladas</Heading>
                        <Text>Encontre abaixo a melhor opção para cumprir os seus objetivos!</Text>

                        <CartasLike />

                    </Stack>

                   
                </Stack>
            </Flex>

            
            {/* <Box position="fixed" right="20px" bottom="20px" zIndex="2" boxShadow="lg">
                <MainButton onClick={() => handleOpenSumModal()} fontSize="md" size="lg">
                    Somar
                </MainButton>
            </Box> */}

            <Footer/>
        </Box>
    )
}
