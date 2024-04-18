import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AspectRatio, Avatar, Box, Flex, Heading, HStack, Icon, Img, Spinner, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import Slider from "react-slick";
import { Header } from '../components/Header'
import { MainButton } from '@/components/Buttons/MainButton'

import HS from '../../public/hs_white.svg';
import { StepsSection } from '@/components/StepsSection'

import Check from '../../public/check.svg';
import Logo from '../../public/logo.svg';
import { Input } from '@/components/Forms/Inputs/Input'
import { TextTag } from '@/components/TextTag'
import { Footer } from '@/components/Footer'
import Quote from '../../public/quote.svg';
import { useEffect, useState } from 'react';
import { Services } from '@/components/Services';
import gsap from 'gsap';
import Head from 'next/head';
import { Loading } from '@/components/Loading';
import { ServicesTwo } from '@/components/Services/ServicesTwo';
import { ServicesMobile } from '@/components/Services/ServicesMobile';
import { Contact } from '@/pageParts/Contact';
import { callWhatsapp } from '@/functions/callWhatsapp';
import { StepsSectionClean } from '@/components/StepsSectionClean';
import { SimulationLead, useSimulador } from '@/contexts/SimuladorContext';
import { HeaderAlt } from '@/components/Header/HeaderAlt';

import BACEN from '../../public/abac_white_full.svg';
import ABAC from '../../public/bacen_white_full.svg';
import { CheckCircle, Plus, Star } from 'react-feather';

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledInput } from '@/components/Forms/Inputs/ControlledInput';
import moneyToBackend from '@/utils/moneyToBackend';
import Link from 'next/link';
import { SolidButton } from '@/components/Buttons/SolidButton';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import * as gtag from '../services/gtag';
import { useFacebookPixel } from '@/components/Facebook';
import { FooterLP } from '@/components/Footer/FooterLP';
import { Quotation } from '@/components/Quotation';

export interface CalculateLead{
    name: string;
    city: string;
    value: string;
    email: string;
    phone: string;
}

const CalculateFormSchema = yup.object().shape({
    name: yup.string().required('Qual o seu nome?'),
    email: yup.string().email("Informe um e-mail válido").required('Preencha o e-mail'),
    phone: yup.string().required('Informe seu telefone'),
    city: yup.string().required('Informe a sua cidade'),
    value: yup.string().required('Diga quanto quer investir.'),
});

interface Credit{
    value: number;
    parcel: number;
}

const credits: Credit[] = [
    {
        parcel: 341,
        value: 100000
    },
    {
        parcel: 512.25,
        value: 150000
    },
    {
        parcel: 615,
        value: 180000
    },
    {
        parcel: 922.50,
        value: 300000
    },
    {
        parcel: 1230,
        value: 400000
    },
    {
        parcel: 1677,
        value: 600000
    },
    {
        parcel: 1956,
        value: 700000
    },
    {
        parcel: 2236,
        value: 800000
    },
    {
        parcel: 2515,
        value: 900000
    },
    {
        parcel: 2795,
        value: 1000000
    },
    {
        parcel: 3354,
        value: 1200000
    },
    {
        parcel: 3354,
        value: 1200000
    },
    {
        parcel: 3633,
        value: 1300000
    },
    {
        parcel: 4192.50,
        value: 1500000
    },
]

export interface ResultCalculate{
    potentialIncome: number;
    monthlyIncome: number;
    feesIncome: number;
    parcel: number;
}

export default function Estrategia() {
    const searchParams = useSearchParams()
    const [utmSource, setUtmSource] = useState<null|string>();
    const [utmCampaign, setUtmCampaign] = useState<null|string>();
    const [utmMedium, setUtmMedium] = useState<null|string>();
    const [utmContent, setUtmContent] = useState<null|string>();

    const {reactPixel} = useFacebookPixel();

    const [activeSlide, setActiveSlide] = useState(0);

    const isWideVersion = useBreakpointValue({base: false, lg: true,});
    const isMobile = useBreakpointValue({base: true, sm: false,});

    const leadForm = useForm<CalculateLead>({
        resolver: yupResolver(CalculateFormSchema),
        defaultValues:{
          name: '',
          email: '',
          city: '',
          value: '',
          phone: '',
        }
    });

    const settings = {
        dots: true,
        centerMode: true,
        infinite: true,
        speed: 2500,
        slidesToShow: isWideVersion ? 3 : 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7500,
        pauseOnHover: true,
        beforeChange: (current: number, next: number) => setActiveSlide(next),
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo("#introText", { 
                    autoAlpha: 0,
                    y: 100,
                    duration: 5
                },{ 
                    delay: 4.2,
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.0
                }
            );
        });
    }, [])

    //console.log(activeSlide);
    const callConsultant = () => {
        window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada para meus investimentos`, '_blank');
    }

    const [result, setResult] = useState<ResultCalculate>();
    const [loading, setLoading] = useState<boolean>(false);

    const calculateInvestiment = (data: CalculateLead) => {
        setLoading(true);

        const investiment = parseFloat(moneyToBackend(data.value));

        const credit = credits.reduce((previous, credit) => {
            return (Math.abs(credit.parcel - investiment) < Math.abs(previous.parcel - investiment) ? credit : previous);
        });

        if(credit){
            const selic = 10.15*0.90;

            const newResult:ResultCalculate = {
                potentialIncome: credit?.value * 0.20,
                monthlyIncome: credit?.value*(0.7/100),
                feesIncome: credit?.value*(selic/100),
                parcel: investiment,
            }

            setResult(newResult);

            axios.post("https://hook.us1.make.com/1kt3b6h3i8k65dw3qphq3pag2vgt7b6n", {
                Nome: data.name,
                Email: data.email,
                Telefone: `+55${data.phone.replace("(", "").replace(")", "").replace("-", "").replace(" ", "")}`,
                Investimento: data.value,
                utm_source: utmSource,
                utm_campaign: utmCampaign,
                utm_medium: utmMedium,
                utm_content: utmContent,
            });

            if(reactPixel){
                const tracked = reactPixel.track('Lead', {content_name: 'Consórcio', currency: "BRL"});
            }

            gtag.track('conversion', { sendTo: 'AW-11140098875/953YCPK2tZYYELvWgcAp', value: 0, currency: 'BRL'});

            
            setTimeout(function() { setLoading(false); }, 5000);
        }
    }

    const simulador = useSimulador();

    useEffect(() => {
        setUtmSource(searchParams.get("utm_source"));
        setUtmCampaign(searchParams.get("utm_campaign"));
        setUtmMedium(searchParams.get("utm_medium"));
        setUtmContent(searchParams.get("utm_content"));
    }, [searchParams])

    console.log(leadForm.formState);

    return (
    <>
        <Head>
            <title>S&S Investimentos - Soluções financeiras para sua alavancagem patrimonial</title>

            <meta name="description" content="Fornecemos o meio financeiro para você adquirir imóveis, veículos, investimentos e alavancar seu patrimônio."></meta>
        </Head>


        <Flex flexDir="column" w="100%" bg="url(./images/real.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Box bg="linear-gradient(3.06deg, rgba(45, 50, 80, 0.43) -20.72%, #181818 93.12%)" _before={{}}>
                <Flex flexDir="column">
                        <Stack w={"100%"} bg="#fa0c0c" textAlign={"center"} paddingY="4" spacing="3">
                            <Text fontSize={"18px"} color={"#ffffff"} fontWeight={"bold"} textTransform={"uppercase"}>3 vagas restantes</Text>
                            <Text fontSize={"18px"} color={"#ffffff"}>Simule e garanta a sua Consultoria</Text>
                        </Stack>
                    <HeaderAlt/>
                </Flex>
                
                {/* <Stack px="6" w="100%" maxW="1200px" m="0 auto" py={["5","20","20","20"]} pb="20">
                    <Stack alignItems={"flex-start"} direction={["column","column","row","row"]} spacing={["24"]}>
                        <Stack textAlign={"left"} alignItems={"left"}  spacing={["8","12","16","16"]} w={["100%", "100%", "50%", "50%"]}>
                            <Stack spacing="6">
                                <TextTag textTransform={"uppercase"} letterSpacing={"5px"}>Novo Método</TextTag>
                                <HStack spacing={5} w="100%">
                                    <Flex maxW={"120px"} w="100%">
                                        <BACEN/>
                                    </Flex>
                                    <Flex maxW={"120px"} w="100%">
                                        <ABAC/>
                                    </Flex>
                                </HStack>  
                            </Stack> 
                            <Heading color="#D59665" fontSize={["42px"]} fontWeight="regular">Invista, Adquira e rentabilize o seu dinheiro</Heading>
                            <Text color={"#ffffff"} fontSize={["16px","20px","24px","28px"]}>Veja a estratégia que pode lucrar até <b>1000%</b> ou rentabilizar com imóveis e juros.</Text>
                        
                            <Stack direction={["column","column","row","row"]} spacing={"8"}>
                                <Img maxW="200px" src='./images/custumers.png'/>
                                <Img maxW="200px" src='./images/Stars.svg'/>
                            </Stack>

                            <MainButton onClick={simulador.handleOpenSimulador}>Simule Seu Investimento</MainButton>
                        </Stack>

                        <VStack w={["100%", "100%", "50%", "50%"]} alignContent={"left"} spacing={"4"}>

                            <AspectRatio maxW={"100%"} w="100%" ratio={4/5} mt="-30px">
                                <iframe width="900" src="https://www.youtube.com/embed/KhZwcW0DtLk?si=GCh9h7sAYcXhgjAL" title="Métodos de Ganhar Dinheiro com Consórcio" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </AspectRatio>

                            <VStack spacing={"1"}>
                                <Heading fontSize={"xl"} color="#ffffff">Robson Seibel</Heading>
                                <Text color="#dbdbdb">Fundador da S&S Soluções e Investimentos</Text>
                                <Text fontWeight={"semibold"} color="#D59665">Diversas premiações de nível nacional</Text>
                            </VStack>
                        </VStack>
                    </Stack>
                </Stack> */}

                <Stack px="6" w="100%" maxW="900px" m="0 auto" pt="5" pb="20">
                    <Stack alignItems={"flex-start"} direction={["column","column","row","row"]} spacing={["24"]}>

                        <Stack textAlign={"center"} alignItems={"center"}  spacing={["8","12","12","12"]} w={["100%", "100%", "100%", "100%"]}>
                            <Stack spacing={"4"}>
                                <Text color={"#ffffff"} fontSize={"48px"} fontWeight={"semibold"} letterSpacing={"3px"}>CapitalMAX</Text>
                                <Heading color="#D59665" fontSize={["24px","28px","28px"]} fontWeight="regular">A Ferramenta financeira ideal para você prosperar financeiramente.</Heading>
                            </Stack>
                            {/* <Heading color="#D59665" fontSize={["42px"]} fontWeight="regular">Invista seu dinheiro de maneira eficiente para multiplicação, aposentadoria financeira e futuros ganhos mensais.</Heading> */}
                            <Img src="./images/BannerCapitalMax.png"/>
                            {/* <Text color="white" fontSize={["28px"]} fontWeight="regular">O <b>CAPITAL MAX</b> é um método criado para você de fato começar a guardar direcionando para fazer seu dinheiro multiplicar a longo prazo pensando no seu futuro. <u>Veja os resultados de acordo com o quanto quer investir</u></Text> */}
                            <Text color="white" fontSize={["24px","32px","32px"]} fontWeight="regular"> <u>Método que ajudou centenas de pessoas a aplicar dinheiro de maneira eficiente.</u></Text>
                           
                            <HStack>
                                <Img maxW={"50px"} src="./images/StarCPM.svg" />
                                <Img maxW={"50px"} src="./images/StarCPM.svg" />
                                <Img maxW={"50px"} src="./images/StarCPM.svg" />
                                <Img maxW={"50px"} src="./images/StarCPM.svg" />
                                <Img maxW={"50px"} src="./images/StarCPM.svg" />                            
                            </HStack>

                            <Text color="white" fontSize={["14px","18px","18px"]} fontWeight="regular">O <b>CAPITAL MAX</b> é um método comprovado que reúne as melhores estratégias do mercado imobiliário e financeiro para qualquer pessoa que queira fazer investimentos de forma segura e rentável através de cartas de crédito.</Text>

                            <Stack spacing="0" w={"100%"}>
                                {/* <AspectRatio maxW={"100%"} w="100%" ratio={16/9} mt="-30px">
                                    <iframe width="900" src="https://www.youtube.com/embed/KhZwcW0DtLk?si=GCh9h7sAYcXhgjAL" title="Métodos de Ganhar Dinheiro com Consórcio" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                </AspectRatio> */}

                                <Stack id="calculadora" as="form" pos="relative" onSubmit={leadForm.handleSubmit(calculateInvestiment)} w="100%" textAlign={"left"} bg="blue.primary" borderRadius={"6"} p="6" color="white" spacing="10">
                                    {
                                        loading && (
                                            <Flex zIndex={5} pos="absolute" bg="blue.primary" left="0" bottom={0} right="0" top="0" alignItems={"center"} justifyContent="center">
                                                <HStack>
                                                    <Spinner />
                                                    <Text>Calculando seu investimento</Text>
                                                </HStack>
                                            </Flex>
                                        )
                                    }
                                    {
                                        result ? (
                                            <>
                                                <Heading fontSize={["2xl","2xl","4xl"]}>Aqui está a capacidade de retorno investindo {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.parcel)} por mês</Heading>

                                                <Stack fontSize={"2xl"}>
                                                    <HStack>
                                                        <Text>Ganho potencial: Até <b>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.potentialIncome)} de lucro</b> </Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text>Renda mensal estimada: <b>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.monthlyIncome)}/mês</b> </Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text>Juros sobre sua aplicação: Até <b>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.feesIncome)}/ano</b></Text>
                                                    </HStack>
                                                </Stack>

                                                <Stack spacing="5">
                                                    <Text>Entenda a estratégia de forma completa:</Text>
                                                    <Link target={"_blank"} href="https://wa.me/+5551999148599?text=Olá!Gostaria de saber mais sobre o método de investimento da SS Investimentos, o Capital Max!">
                                                        <SolidButton bg="green.400">Conversar no Whatsapp</SolidButton>
                                                    </Link>
                                                </Stack>
                                            </>
                                        ):(
                                            <>
                                                {/* <Heading>Simule seu investimento Aqui</Heading> */}
                                                {/* <Heading>Receba seus resultados de investimento pelo CAPITAL MAX</Heading> */}
                                                <TextTag>Calculadora Exclusiva</TextTag>
                                                <Heading fontSize={["2xl","2xl","4xl"]}>Veja quanto o <Text as="span" color="#D59665">CAPITAL MAX</Text> gera para você de retorno</Heading>

                                                <Stack direction={["column","column","row","row"]} justifyContent={"space-between"} spacing={["12","8","4"]}>
                                                    <Stack>
                                                        <Text textTransform={"uppercase"}>Voce vai visualizar:</Text>
                                                        <HStack>
                                                            <Icon as={Plus} stroke={"#D59665"} fontSize="22px"/>
                                                            <Text>Rendimento na comercialização de ativos</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Icon as={Plus} stroke={"#D59665"} fontSize="22px"/>
                                                            <Text>Renda mensal estimada</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Icon as={Plus} stroke={"#D59665"} fontSize="22px"/>
                                                            <Text>Juros sobre sua aplicação</Text>
                                                        </HStack>
                                                    </Stack>

                                                    <Stack>
                                                        <Text textTransform={"uppercase"}>Indicado para pessoas que:</Text>
                                                        <HStack>
                                                            <Icon as={CheckCircle} stroke={"green.400"} fontSize="26px"/>
                                                            <Text>Buscam uma maneira certeira de investir;</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Icon as={CheckCircle} stroke={"green.400"} fontSize="26px"/>
                                                            <Text>Pretendem alavancar patrimônio;</Text>
                                                        </HStack>
                                                        <HStack>
                                                            <Icon as={CheckCircle} stroke={"green.400"} fontSize="26px"/>
                                                            <Text>Querem diversificar seus investimentos;</Text>
                                                        </HStack>
                                                    </Stack>
                                                </Stack>

                                                <Stack>
                                                    <Stack direction={["column","column","row","row"]} justifyContent="center">
                                                        <ControlledInput color="blue.primary" control={leadForm.control} error={leadForm.formState.errors.name} name="name" placeholder="Nome completo" type="text"/>
                                                        <ControlledInput color="blue.primary" control={leadForm.control} error={leadForm.formState.errors.email} name="email" placeholder="Seu E-mail" type="email"/>
                                                        {/* <ControlledInput color="blue.primary" control={leadForm.control} error={leadForm.formState.errors.name} mask="phone" name="phone" placeholder="Telefone" label="*Telefone" type="text"/> */}
                                                    </Stack>
                                                    <Stack direction={["column","column","row","row"]}>
                                                        <ControlledInput color="blue.primary" control={leadForm.control} error={leadForm.formState.errors.name} mask="phone" name="phone" placeholder="Telefone" type="text"/>
                                                        <ControlledInput color="blue.primary" control={leadForm.control} error={leadForm.formState.errors.city} name="city" placeholder="Cidade" type="text"/>
                                                    </Stack>
                                                    <Flex  justifyContent="center">
                                                        <ControlledInput maxW="400px" color="blue.primary" fontSize={"2xl"} control={leadForm.control} error={leadForm.formState.errors.value} mask="money" name="value" placeholder="Quanto quer investir mensalmente?" label="*Quanto quer investir mensalmente?" type="text"/>
                                                    </Flex>
                                                </Stack>

                                                <Stack spacing="8" w="100%" alignItems={"center"} justifyContent="center">
                                                    <MainButton type="submit">VER POTENCIAL DE LUCRO</MainButton>
                                                    <HStack spacing={5} w="100%" maxW="260px">
                                                        <BACEN/>
                                                        <ABAC/>
                                                    </HStack>  
                                                </Stack>
                                            </>
                                        )
                                    }
                                </Stack>
                                {
                                    result && (
                                        <Img src="./images/banner_robson.png" />
                                    )
                                }
                            </Stack>
{/*                         
                            <Stack direction={["column","column","row","row"]} spacing={"8"}>
                                <Img maxW="200px" src='./images/custumers.png'/>
                                <Img maxW="200px" src='./images/Stars.svg'/>
                            </Stack> */}
                        </Stack>

                    </Stack>
                </Stack>
            </Box>
        </Flex>   

        <Flex m="0 auto" w="100%" bg="linear-gradient(285.92deg, #2D3250 17.26%, #181818 92.19%);">
           
           <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="center">

                <Stack w={"100%"} spacing={"16"} textAlign={"center"}>

                    <Heading color={"#ffffff"} fontSize={"36px"} fontWeight={"bold"}>Rentabilidade Campeã</Heading>

                    <Quotation />
                    
                        <Stack direction={["column", "column", "row"]} spacing={"16"} w={"100%"} justifyContent={"center"}>
                            <HStack spacing={"8"}>
                                <Img w={["150px"]} h={"150px"} src="./images/supIbov.png"/>
                                <Img w={["150px"]} h={"150px"} src="./images/supSelic.png"/>
                            </HStack>
                           
                            <HStack spacing={"8"}>
                                <Img w={["150px"]} h={"150px"} src="./images/supPoup.png"/>
                                <Img w={["150px"]} h={"150px"} src="./images/supCdb.png"/>
                            </HStack>
                        </Stack>

                </Stack>

            </Stack>
        </Flex>

        <Flex m="0 auto" w="100%" pos="relative" bg="#ffffff" backgroundSize="cover" backgroundPosition="0 0px">
           
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="center">
                
                <HStack w={"100%"}>
                    <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                    <VStack alignContent={"center"} textAlign={"center"} w={["100%", "100%", "50%", "50%"]}>
                        <Heading fontSize={["52px", "52px", "42px", "42px"]} color={"#2D3250"}>Tenha um patrimônio</Heading>
                        <Heading fontSize={"24px"} color={"#2D3250"}>Que se paga com o tempo</Heading>
                    </VStack>
                    <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(-90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                </HStack>

                <Stack alignItems={"flex-start"} direction={["column","column","row","row"]} py="60px" spacing={["10"]}>

                    <Stack w={["100%", "100%", "50%", "50%"]} spacing={"10"}>
                        <Heading color={"#2D3250"}>Fase de Planejamento:</Heading>

                        <Stack spacing={"10"}>
                            <HStack spacing={"8"}>
                                <Img src='./images/estrategia1.svg'/>

                                <Stack spacing={"4"}>
                                    <Heading fontSize={"24px"}>1. Você inicia o seu plano de investimento</Heading>
                                    <Text>Você escolhe a melhor estratégia para você, seleciona o crédito e a parcela.</Text>
                                </Stack>
                            </HStack>

                            <HStack spacing={"8"}>
                                <Img src='./images/estrategia2.svg'/>

                                <Stack spacing={"4"}>
                                    <Heading fontSize={"24px"}>2. Contempla o Crédito</Heading>
                                    <Text>Ao contemplar você precisa decidir o que fazer com o capital.</Text>
                                </Stack>
                            </HStack>
                        </Stack>
                    </Stack>

                    <Stack w={["100%", "100%", "50%", "50%"]} spacing={"10"}>
                        <Heading color={"#2D3250"}>Fase de Investimento:</Heading>

                        <Stack spacing={"10"}>
                            <HStack spacing={"8"}>
                                <Img src='./images/estrategia3.svg'/>

                                <Stack spacing={"4"}>
                                    <Heading fontSize={"24px"}>1. Lucro com a Venda</Heading>
                                    <Text>Venda a sua carta contemplada e tenha um lucro de até 1.000% do valor investido;</Text>
                                </Stack>
                            </HStack>

                            <HStack spacing={"8"}>
                                <Img src='./images/estrategia4.svg'/>

                                <Stack spacing={"4"}>
                                    <Heading fontSize={"24px"}>2. Compra de Imóveis para Alugar</Heading>
                                    <Text>Adquirir imóveis para locação, e pagar o a sua parcela com os alugueis e ainda obter lucro.</Text>
                                </Stack>
                            </HStack>

                            <HStack spacing={"8"}>
                                <Img src='./images/estrategia5.svg'/>

                                <Stack spacing={"4"}>
                                    <Heading fontSize={"24px"}>3. Rendimento de Juros</Heading>
                                    <Text>Deixe o seu montante redendo juros para você, seu rendimento é sobre o crédito total e não sobre o investimento.</Text>
                                </Stack>
                            </HStack>
                        </Stack>
                    </Stack>

                </Stack>

            </Stack>
        </Flex>
        
        <Flex m="0 auto" w="100%" pos="relative" bg="linear-gradient(285.92deg, #2D3250 17.26%, #181818 92.19%);">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" textAlign={"center"} >

                    <HStack w={"100%"} mb="50px">
                        <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                        <VStack alignContent={"center"} textAlign={"center"} w={["100%", "100%", "50%", "50%"]}>
                            <Heading fontSize={["52px", "52px", "42px", "42px"]} color={"white"}>Resultados Entregues</Heading>
                        </VStack>
                        <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(-90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                    </HStack>

                <Stack spacing="16" justifyContent={[ "left", "space-between" ]} direction={["column", "column", "row"]}>

                    <Stack w={["100%", "100%", "25%", "25%"]} padding={"10px"} spacing={"6"} textAlign={"left"}>
                        <Text fontSize={"25px"} color={"white"}>Porto Alegre-RS</Text>

                        <Img w="100%" src='images/extrato3.png' />

                        <Text color={"white"} fontSize={"20px"}>Contemplado no 1º mês, lucro líquido de</Text>

                        <Heading color="white" fontSize={"35px"}>R$18.000 em um mês</Heading>

                    </Stack>

                    <Stack w={["100%", "100%", "25%", "25%"]} padding={"10px"} spacing={"8"} textAlign={"left"}>
                        <Text fontSize={"25px"} color={"white"}>Ivoti-RS</Text>

                        <Img w="100%" src='images/extrato4.png' />

                        <Text color={"white"} fontSize={"20px"}>Contemplado no 2º mês, lucro líquido de</Text>

                        <Heading color="white" fontSize={"35px"}>R$15.000 em dois meses</Heading>

                    </Stack>

                    <Stack w={["100%", "100%", "25%", "25%"]} padding={"10px"} spacing={"8"} textAlign={"left"}>
                        <Text fontSize={"25px"} color={"white"}>Tramandaí-RS</Text>

                        <Img w="100%" src='images/extrato1.png' />

                        <Heading color="#D59665" fontSize={"25px"}>Juros compostos</Heading>

                        <Text color={"white"}>Após contemplar, deixou o crédito total rendendo para receber ganhos superiores a investimentos tradicionais.</Text>
                    </Stack>

                    <Stack w={["100%", "100%", "25%", "25%"]} padding={"10px"} spacing={"8"} textAlign={"left"}>
                        <Text fontSize={"25px"} color={"white"}>Caxias do Sul-RS</Text>

                        <Img w="100%" src='images/extrato2.png' />

                        <Heading color="#D59665" fontSize={"25px"}>Aquisição</Heading>

                        <Text color={"white"}>Após contemplar, adquiriu um apartamento para alugar e receber renda passiva proveniente do seu novo imóvel.</Text>
                    </Stack>

                </Stack>

                <Stack w="100%" paddingY="6">
                    <Link href="#calculadora">
                        <MainButton>Simule Seu Investimento</MainButton>
                    </Link>
                </Stack>

            </Stack>
        </Flex>



        
        {/* <Flex m="0 auto" w="100%" pos="relative" bg="#ffffff" backgroundSize="cover" backgroundPosition="0 0px">
           
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="center">
                
                <HStack w={"100%"}>
                    <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                    <VStack alignContent={"center"} textAlign={"center"} w={["100%", "100%", "50%", "50%"]}>
                        <Heading fontSize={["52px", "52px", "42px", "42px"]} color={"#2D3250"}>Investimento</Heading>
                    </VStack>
                    <Box display={["none", "none", "flex", "flex"]} h={"2px"} w={"25%"} bg={"linear-gradient(-90deg, rgba(0,0,2,0) 0%, rgba(167,116,75,1) 75%);"} />
                </HStack>

                <Stack alignContent={"center"} textAlign={"center"} w={"100%"}>

                    <Text fontSize={"36px"}>Invista de forma planejada para conquistar os seus objetivos pagando pouco.</Text>

                    <Stack direction={["column","column","row","row"]} display={"flex"} spacing={"12"} w={"100%"} justifyContent={"center"} textAlign={"center"} py="14">
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Sem Juros</Text>
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Sem Entrada</Text>
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Pague Apenas meia Parcela</Text>
                    </Stack>

                    <Flex width={"100%"} justifyContent={"center"} textAlign={"center"}>
                        <MainButton onClick={simulador.handleOpenSimulador}>Simule Seu Investimento</MainButton>
                    </Flex>
                </Stack>

            </Stack>

        </Flex> */}

        

        <Flex id="clientes" m="0 auto" w="100%" pos="relative" bg="linear-gradient(285.92deg, #2D3250 17.26%, #181818 92.19%);">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} paddingBottom="24"  flexDirection="column" textAlign={"center"} >
                <Stack spacing="24" pos="relative">

                    {/* <Stack alignItems={"center"} color="white" pos="relative">
                        <Box pos="absolute" bg="#6D7DD9" filter="blur(135px)" h="260px" w="260px" zIndex={1}/>

                        <Stack bg="blue.primary" maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} zIndex={2}>
                            <Quote/>
                            <Text py="14">Estou muito contente com o trabalho da SS. Virei cliente através da indicação de um amigo e até hoje tenho produtos em minha carteira de investimentos. Recomendo sem dúvidas!</Text>
                        </Stack>

                        <Stack alignItems={"center"} mt="-35px !important" spacing="4" zIndex={2}>
                            <Avatar size="lg"/>
                            <Stack spacing="0">
                                <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Marcela Ribeiro</Text>
                                <Text color="gray.300">CEO Lorem</Text>
                            </Stack>
                        </Stack>
                    </Stack> */}

                    <Stack pos="absolute" w="100%" zIndex={1} alignItems="center" justifyContent={"center"} h="100%">
                        <Box bg="#6D7DD9" filter="blur(135px)" h="260px" w="260px"/>
                    </Stack>

                    <Stack fontSize={["md","md","md","md"]} spacing={["8","8","8","8"]} pos="relative" zIndex={2} color="white" w="100%"  px={["12","12","20"]} py="10" justifyContent="space-between" alignItems={"center"} direction={["column", "column", "row"]}>
                        <Box pos="absolute" zIndex={1} opacity="0.4" left="0" right="0" top="0" bottom="0" backdropFilter={"blur(15px)"} bg="linear-gradient(90.79deg, rgba(255, 255, 255, 0) 4.09%, rgba(255, 255, 255, 0.13) 46.27%, rgba(248, 177, 121, 0.1) 56.98%, rgba(248, 177, 121, 0) 98.12%);"/>
                        
                        <Stack zIndex={2}>
                            <Text fontStyle="italic" fontWeight={"light"}>CORRETOR AUTORIZADO</Text>
                            <HS/>
                        </Stack>

                        {
                            isMobile && <Box h="1px" w="100px" bg="rgba(255,255,255,0.4)"/>
                        }

                        <Stack zIndex={2} alignItems={["left","left","center","center",]} textAlign={isMobile ? "center" : "left"}>
                            <Text fontWeight={"light"}>Clientes ativos</Text>
                            <Text fontWeight={"normal"} fontSize={["3xl","2xl","2xl","3xl","4xl"]}>2.700</Text>
                        </Stack>

                        {
                            isMobile && <Box h="1px" w="100px" bg="rgba(255,255,255,0.4)"/>
                        }

                        <Stack zIndex={2} alignItems={["left","left","center","center",]} textAlign={isMobile ? "center" : "left"}>
                            <Text fontWeight={"light"}>Créditos intermediados</Text>
                            <Text fontWeight={"normal"} fontSize={["3xl","2xl","2xl","2xl","4xl"]}>+ R$ 900.000.000</Text>
                        </Stack>

                        {
                            isMobile && <Box h="1px" w="100px" bg="rgba(255,255,255,0.4)"/>
                        }

                        <Stack zIndex={2} alignItems={["left","left","center","center",]} textAlign={isMobile ? "center" : "left"}>
                            <Text fontWeight={"light"}>Experiência no ramo</Text>
                            <Text fontWeight={"normal"} fontSize={["3xl","2xl","2xl","2xl","4xl"]}>+ 13 anos</Text>
                        </Stack>
                    </Stack>

                    <Text color="white" fontSize={["38px", "46px"]} fontWeight="medium" lineHeight={["48px", "58px"]} px="6">Pessoas que depositam sua confiança em nossa expertise e soluções</Text>

                    <Slider {...settings}>
                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 0 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote />
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>O Robson é sinônimo de comprometimento, sempre responde rápido não importando a hora que o chamo, explica tudo quantas vezes forem preciso, em resumo seu atendimento é impecável! Já estou na segunda carta e não pretendo parar de comprar com ele!</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente5.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Guilherme Rizzo</Text>
                                    <Text color="gray.300">Sócio e Fundador do Grupo Rizzo</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white" pos="relative" width="100%">
                            {/* {
                               activeSlide === 0 && <Box pos="absolute" bg="#6D7DD9" filter="blur(135px)" h="260px" w="260px" zIndex={-1}/>
                            } */}

                            <Stack zIndex={2} bg={activeSlide === 1 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Nossa experiência com a S&S foi ótima. Robson conhece muito sobre investimentos e, como foi no nosso caso, sobre Consórcios. Transmite segurança e transparência na condução do contrato.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente1.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Katia Santos</Text>
                                    <Text color="gray.300">Administradora Financeira</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 2 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Quero aqui testemunhar o atendimento diferenciado da S&S através da pessoa do Robson que além de esclarecer as dúvidas sobre o investimento em consórcios nos orienta sobre a melhor forma de investir conforme nosso perfil e renda disponível no momento.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente2.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Paulo Airton Santos</Text>
                                    <Text color="gray.300">Diretor PS&CA</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 3 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Através do consórcio, adquirimos 10 cartas que nos aproximaram ainda mais do nosso tão sonhado objetivo. Estamos extremamente satisfeitos com o atendimento excepcional que recebemos, principalmente do Sr. Robson. Sua dedicação, conhecimento fizeram a diferença em cada etapa do processo...</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente3.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>João Carlos E Lilian</Text>
                                    <Text color="gray.300" >Empresário e Médica</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 4 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Conheço o Robson e o Cristiano a mais de 20 anos, são pessoas sérias, sempre comprometidas em ajudar seus clientes e amigos da melhor forma, indicando formas de investimento. Recomendo muito o atendimento e os serviços deles.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" src='./images/cliente6.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Márcio Goldschmidt e Daiana Fröhlich</Text>
                                    <Text color="gray.300">Empresário e Coordenadora Pedagógica</Text>
                                </Stack>
                            </Stack>
                           
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 5 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Quando o assunto é consórcio a gente sabe onde encontrar um parceiro honesto e confiável. Robson é um agente fantástico de vendas da HS Consórcios! Com ele planejamos nosso futuro familiar sem medo. Além de confiabilidade, que é um fator indispensável, quando tratamos de investimento, Robson, também buscar para seus clientes o melhor caminho para que tudo ocorra conforme o planejamento.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" src='./images/cliente8.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Alejandro Brittes e Magali de Rossi</Text>
                                    <Text color="gray.300">Músico e Produtora</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                    </Slider>

                </Stack>
            </Stack>
        </Flex>

        <Flex id="contato" m="0 auto" w="100%" pos="relative" bg="url(./images/robson_bg.jpg)" backgroundSize="cover" backgroundPosition={["center left","center left","center right","center right","center right"]}>
            <Flex bg="linear-gradient(356.76deg, rgba(33, 39, 73, 0.37) 6.14%, #212749 122.55%)" w="100%" _before={{content: '""', pos: "absolute", bg: "gradient", height: "100%", w: ["5px","10px","10px","10px","20px"]}}>
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="left">
                    <Stack spacing="16" w="100%" maxW="500px">
                        <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Faça o seu dinheiro render da melhor forma</Text>

                        <Stack transition="all ease 0.5s">
                            <Stack spacing="8" transition="all ease 0.5s">
                                

                                <Text color={"#ffffff"} fontSize={"28px"}>Invista com:</Text>
                        
                                <VStack display={"flex"} justifyContent={"left"} alignItems={"left"}>
                                    <HStack spacing="6" bg="#2D3250" padding={"20px"} borderRadius={"10px"}>
                                        <Flex w="35px">
                                            <Check width="35px"/>
                                        </Flex>
                                        <Text fontSize={"24px"} color="white">Segurança e Tranquilidade.</Text>
                                    </HStack>

                                    <HStack spacing="6" bg="#2D3250" padding={"20px"} borderRadius={"10px"}>
                                        <Flex w="35px">
                                            <Check width="35px"/>
                                        </Flex>
                                        <Text fontSize={"24px"} color={"white"}>Invista com especialistas renomados</Text>
                                    </HStack>

                                    <HStack spacing="6" bg="#2D3250" padding={"20px"} borderRadius={"10px"}>
                                        <Flex w="35px">
                                            <Check width="35px"/>
                                        </Flex>
                                        <Text fontSize={"24px"} color={"white"}>Investimentos regulamentados</Text>
                                    </HStack>

                                    <HStack spacing="6" bg="#2D3250" padding={"20px"} borderRadius={"10px"}>
                                        <Flex w="35px">
                                            <Check width="35px"/>
                                        </Flex>
                                        <Text fontSize={"24px"} color={"white"}>Investimentos regulamentados</Text>
                                    </HStack>
                                </VStack>
                                
                                <Link href="#calculadora">
                                    <MainButton>Simule Seu Investimento</MainButton>
                                </Link>
                            </Stack>

                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>

        <FooterLP/>
    </>
  )
}