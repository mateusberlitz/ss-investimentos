import { Box, Button, Checkbox, filter, Flex, Heading, HStack, Icon, IconButton, ListItem, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, UnorderedList, useBreakpointValue, useToast } from "@chakra-ui/react";
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
import CartasLike from "./cartaslike";
import { FooterLP } from "@/components/Footer/FooterLP";



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
                            <Link href="/estrategia"><Text _hover={{textDecor:"underline"}} color="rgb(0, 0, 0)" fontSize={"18px"}>Retornar</Text></Link>
                        </HStack>
                        <Heading fontSize={["4xl","5xl","6xl","6xl"]}>Politica de Privacidade</Heading>

                        <Stack spacing={"8"} fontSize={"16px"}>

                            <Text>A sua privacidade é importante para nós. É política do S&S Soluções E Investimentos respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site S&S Soluções E Investimentos (https://www.ssinvestimentos.com.br), e outros sites que possuímos e operamos.</Text>

                            <Text>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</Text>

                            <Text>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</Text>

                            <Text>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</Text>

                            <Text>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</Text>

                            <Text>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</Text>

                            <Text>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.</Text>

                            <UnorderedList>
                                <ListItem>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</ListItem>
                                <ListItem>Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</ListItem>
                                <ListItem>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.</ListItem>
                                <ListItem>Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</ListItem>
                            </UnorderedList>

                            <Text>Compromisso do Usuário</Text>

                            <Text>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o S&S Soluções E Investimentos oferece no site e com caráter enunciativo, mas não limitativo:</Text>

                            <UnorderedList>
                                <ListItem>A. Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</ListItem>
                                <ListItem>B. Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, pixbet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</ListItem>
                                <ListItem>C. Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do S&S Soluções E Investimentos, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</ListItem>

                            </UnorderedList>

                            <Text>Mais informações</Text>

                            <Text>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</Text>

                            <Text>Esta política é efetiva a partir de 18 April 2024 12:00</Text>

                        </Stack>
                    </Stack>

                   
                </Stack>
            </Flex>

            
            {/* <Box position="fixed" right="20px" bottom="20px" zIndex="2" boxShadow="lg">
                <MainButton onClick={() => handleOpenSumModal()} fontSize="md" size="lg">
                    Somar
                </MainButton>
            </Box> */}

            <FooterLP/>
        </Box>
    )
}
