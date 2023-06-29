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

export interface Quota{
    id: string;
    administradora: string;
    categoria: string;
    entrada: string;
    parcelas: string;
    valor_credito: string;
    valor_parcela: string;
    reserva: string;
    taxa: string;
    fundo: string;
    contemplada?: boolean;
}

export interface ContempladasProps{
    quotas: Quota[];
}

export interface SelectQuota{
    id: number;
    selected: boolean;
}

export interface ContemplatedsFilter{
    credit: number;
    value: number;
    deadline?: number;
    segment?: string;
    reserved?: string;
    adm?:string;
    contemplada?:boolean;
}

const FilterFormSchema = yup.object().shape({
    credit: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    value: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    deadline: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    segment: yup.string().nullable(),
    reserved: yup.string().nullable(),
    adm: yup.string().nullable(),
});

export default function Cartas({quotas}: ContempladasProps){
    const [isContemplatedsTabSelected, setIsContemplatedsTabSelected] = useState(true);
    const simulador = useSimulador();
    const [isLoadingTab, setIsLoadingTab] = useState(false);

    const toast = useToast();

    const [selectedQuotasId, setSelectedQuotasId] = useState<number[]>([]);
    const [selectedQuotas, setSelectedQuotas] = useState<Quota[]>([]);
    const [isSumOpen, setIsSumOpen] = useState(false);

    const handleOpenSumModal = () => {
        if(isSelectedQuotas()){
            setIsSumOpen(true);

            return;
        }

        toast({
            //title: 'Nenhuma carta foi selecionada.',
            description: "Nenhuma carta foi selecionada.",
            status: 'warning',
            variant: 'left-accent',
            duration: 9000,
            isClosable: true,
        })
    }

    const isSelectedQuotas = () => {
        return selectedQuotas.length > 0;
    }

    const handleCloseSumModal = () => {
        setIsSumOpen(false);
    }

    const handleSwitchTab = (status: boolean) => {
        if(status != isContemplatedsTabSelected){
            setIsLoadingTab(true);
            setIsContemplatedsTabSelected(status);

            setTimeout(() => {
                setIsLoadingTab(false);
            }, 800)
        }
    }

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
                    </Stack>

                    <HStack>
                        <OutlineButton onClick={() => handleSwitchTab(true)} bg={isContemplatedsTabSelected ? "blue.primary" : ""} color={isContemplatedsTabSelected ? "white" : ""} _focus={{bg:"blue.primary", color:"white"}}>Contempladas</OutlineButton>
                        <OutlineButton onClick={() => handleSwitchTab(false)} bg={!isContemplatedsTabSelected ? "blue.primary" : ""} color={!isContemplatedsTabSelected ? "white" : ""} _focus={{bg:"blue.primary", color:"white"}}>Não contempladas</OutlineButton>
                        <OutlineButton onClick={simulador.handleOpenSimulador}>Créditos novos</OutlineButton>
                    </HStack>
                </Stack>
            </Flex>

            <Box pos="relative">
                {
                    isLoadingTab && (
                        <Flex pos="absolute" bg="#F8F8F8" left="0" bottom="0" right="0" top="0" zIndex={9999} w="100%">
                            <Flex mt="100px" justifyContent={"center"} w="100%">
                                <Spinner/>
                            </Flex>
                        </Flex>
                    )
                }
                {
                    isContemplatedsTabSelected ? (
                        <Contempladas quotas={quotas.filter(quota => quota.contemplada != false)}/>
                    ) : (
                        <NaoContempladas quotas={quotas.filter(quota => quota.contemplada === false)}/>
                    )
                }
            </Box>

            {/* <Box position="fixed" right="20px" bottom="20px" zIndex="2" boxShadow="lg">
                <MainButton onClick={() => handleOpenSumModal()} fontSize="md" size="lg">
                    Somar
                </MainButton>
            </Box> */}

            <Footer/>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const quotasMainApi = await serverApi.get('/contempladas').then((response) => response.data);

    let mainFormattedQuotasApi:Quota[] = []
    const formatNumber = new Intl.NumberFormat("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})

    if(quotasMainApi){
        mainFormattedQuotasApi = quotasMainApi.map((quota: MainQuota) => {
            const formattedQuota:Quota = {
                id: `${quota.id.toString()}s`,
                administradora: quota.admin,
                categoria: quota.segment,
                entrada: formatNumber.format(quota.value), //quota.value.toFixed(2),
                fundo: '',
                parcelas: quota.deadline.toString(),
                reserva: quota.reserved ? "Reservada" : "Disponível",
                taxa: '',
                valor_credito: formatNumber.format(quota.credit),
                valor_parcela: formatNumber.format(quota.parcel),
                contemplada: quota.is_contemplated
            }

            return formattedQuota;
        })
    }

    const response = await axios.get('https://contempladas.lanceconsorcio.com.br');

    let quotas:Quota[] = []

    if(quotasMainApi){
        quotas = [...response.data, ...mainFormattedQuotasApi];
    }else{
        quotas = response.data;
    }

    const vehicleQuotas = quotas.filter((quota:Quota) => quota.categoria === "Veículo")
    vehicleQuotas.sort(function (a:Quota, b:Quota) {
        if(parseFloat(a.valor_credito.replace(".", "").replace(",", ".")) > parseFloat(b.valor_credito.replace(".", "").replace(",", "."))){
            return 1;
        }

        if(parseFloat(a.valor_credito.replace(".", "").replace(",", ".")) < parseFloat(b.valor_credito.replace(".", "").replace(",", "."))){
            return -1;
        }

        return 0;
    });

    const realtyQuotas = quotas.filter((quota:Quota) => quota.categoria === "Imóvel")
    realtyQuotas.sort(function (a:Quota, b:Quota) {
        if(parseFloat(a.valor_credito.replace(".", "").replace(",", ".")) > parseFloat(b.valor_credito.replace(".", "").replace(",", "."))){
            return 1;
        }

        if(parseFloat(a.valor_credito.replace(".", "").replace(",", ".")) < parseFloat(b.valor_credito.replace(".", "").replace(",", "."))){
            return -1;
        }

        return 0;
    });

    return {
        props: {
            quotas: [...vehicleQuotas, ...realtyQuotas]
        },
        revalidate: 60 * 5
    }
}