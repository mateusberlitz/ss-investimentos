import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Avatar, Box, Flex, Heading, HStack, Img, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import Slider from "react-slick";
import { Header } from '../components/Header'
import { MainButton } from '@/components/Buttons/MainButton'

import HS from '../../public/hs_white.svg';
import { StepsSection } from '@/components/StepsSection'

import Shield from '../../public/shield.svg';
import Conversation from '../../public/conversation.svg';
import Smile from '../../public/smile.svg';
import Page from '../../public/page.svg';
import Persons from '../../public/persons.svg';
import LogoTipo from '../../public/logotipo.svg';
import HSGold from '../../public/hs_gold.svg';
import SS_HS from '../../public/ss_hs.svg';
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


export default function Home() {

    const [activeSlide, setActiveSlide] = useState(0);

    const isWideVersion = useBreakpointValue({base: false, lg: true,});
    const isMobile = useBreakpointValue({base: true, sm: false,});

    const settings = {
        dots: true,
        centerMode: true,
        infinite: true,
        speed: 1400,
        slidesToShow: isWideVersion ? 3 : 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
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
        window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada.`, '_blank');
    }

    return (
    <>
        <Head>
            <title>SS Investimentos - Soluções financeiras para sua alavancagem patrimonial</title>

            <meta name="description" content="Fornecemos o meio financeiro para você adquirir imóveis, veículos, investimentos e alavancar seu patrimônio."></meta>
        </Head>

        <Loading/>

        <Flex flexDir="column" w="100%" bg="url(./images/real.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Box bg="linear-gradient(3.06deg, rgba(45, 50, 80, 0.43) -20.72%, #181818 93.12%)" _before={{}}>
                <Flex flexDir="column">
                    <Header/>
                </Flex>
                
                <Stack spacing="24" px="6" w="100%" maxW="1200px" m="0 auto" py="20" alignItems={"center"}>
                    <Stack id="introText" textAlign={"center"} alignItems={"center"} spacing="24">
                        <Heading color="white" fontSize={["42px","48px","52px"]} fontWeight="regular">Conquiste os seus objetivos com uma<br/>estratégia de investimento inteligente!</Heading>
                        <MainButton onClick={() => {callWhatsapp()}}>Faça seu Planejamento</MainButton>
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
                </Stack>
            </Box>
        </Flex>   
        
        {/* <StepsSection/> */}
        <StepsSectionClean/>

        <Box id="solucoes"/>

        {
            !isMobile ?  (
                <ServicesTwo/>
            ) : (
                <ServicesMobile/>
            )
        }

        {/* <Services/> */}

        {/* <Stack m="0 auto" w="100%" pos="relative">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" flexDirection="column" textAlign={"center"} alignItems="center">
                <Stack spacing="8" maxW="730px">
                    <Heading color="blue.primary" fontSize={"52px"}>Nossas Principais Soluções</Heading>
                    <Text fontSize={"xl"}>Confira abaixo nossas soluções que são capazes de atender aos mais diversos objetivos financeiros que você possa ter!</Text>
                </Stack>
            </Stack>

            <HStack h="480px" color="white">
                <Flex bg="url(./images/sl_real.jpg)" backgroundSize="cover" backgroundPosition="0 0px" h="100%" cursor={"pointer"}>
                    <Stack role="group" w="300px" bg="rgba(45,50,80,0.7)"  p="8" pos="relative" _hover={{w:"500px"}} transition={"all ease 0.5s"}>
                        <Text fontSize={"2xl"} maxW="230px" >Alavancagem de Capital</Text>
                        <Text transform={"rotate(-90deg)"} transformOrigin="left center" w="fit-content" pos="absolute" left="38px" bottom="0" right="0" top="360px" height="28px" _before={{content: '""', pos:"absolute", display: "block", width: "100%", height: "1px", bg: "gradient", bottom: "0", left:"0", right:"0"}} textTransform="uppercase" letterSpacing={"0.1em"} fontSize="sm">
                            Consultoria Financeira
                        </Text>
                        <Text fontSize={"md"} pl="14" opacity="0" marginTop="120px !important" _groupHover={{opacity: 1, marginTop: "70px !important"}} transition={"all .5s ease 0.5s"}>
                            Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                        </Text>
                        <MainButton ml="14 !important" mt="30px !important" opacity="0" _groupHover={{opacity: 1}} transition={"all .5s ease 0.5s"}>Falar com especialista</MainButton>
                    </Stack>
                </Flex>
            </HStack>
        </Stack> */}

        <Flex m="0 auto" w="100%" pos="relative" bg="linear-gradient(285.92deg, #2D3250 17.26%, #181818 92.19%);">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" textAlign={"center"} >
                <Stack spacing="16" justifyContent={[ "left", "space-between" ]} direction={["column", "column", "row"]}>
                    <Stack textAlign={"left"} w={["100%", "100%", "50%"]}>
                        <HStack px="4" py="4" borderRadius="7" spacing="8" _hover={{bg:"linear-gradient(181.69deg, rgba(255, 255, 255, 0.15) 30.32%, rgba(255, 255, 255, 0) 111.43%)"}}>
                            <Flex pos="relative" minH="63px" minW="63px" zIndex={2} alignItems="center" justifyContent={"center"}>
                                <Box pos="absolute" borderRadius="full" left="0" right="0" bottom="0" top="0" bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" zIndex={-1} opacity="0.2"/>
                                <Shield/>
                            </Flex>

                            <Text color="white">Processos descomplicados e 100% seguro</Text>
                        </HStack>

                        <HStack px="4" py="4" borderRadius="7" spacing="8" _hover={{bg:"linear-gradient(181.69deg, rgba(255, 255, 255, 0.15) 30.32%, rgba(255, 255, 255, 0) 111.43%)"}}>
                            <Flex pos="relative" minH="63px" minW="63px" zIndex={2} alignItems="center" justifyContent={"center"}>
                                <Box pos="absolute" borderRadius="full" left="0" right="0" bottom="0" top="0" bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" zIndex={-1} opacity="0.2"/>
                                <Conversation/>
                            </Flex>

                            <Text color="white">Orientação e esclarecimento de dúvidas sobre os serviços e assessoria.</Text>
                        </HStack>

                        <HStack px="4" py="4" borderRadius="7" spacing="8" _hover={{bg:"linear-gradient(181.69deg, rgba(255, 255, 255, 0.15) 30.32%, rgba(255, 255, 255, 0) 111.43%)"}}>
                            <Flex pos="relative" minH="63px" minW="63px" zIndex={2} alignItems="center" justifyContent={"center"}>
                                <Box pos="absolute" borderRadius="full" left="0" right="0" bottom="0" top="0" bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" zIndex={-1} opacity="0.2"/>
                                <Smile/>
                            </Flex>

                            <Text color="white">Indicação de soluções personalizadas para as necessidades de cada cliente e empresa.</Text>
                        </HStack>

                        <HStack px="4" py="4" borderRadius="7" spacing="8" _hover={{bg:"linear-gradient(181.69deg, rgba(255, 255, 255, 0.15) 30.32%, rgba(255, 255, 255, 0) 111.43%)"}}>
                            <Flex pos="relative" minH="63px" minW="63px" zIndex={2} alignItems="center" justifyContent={"center"}>
                                <Box pos="absolute" borderRadius="full" left="0" right="0" bottom="0" top="0" bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" zIndex={-1} opacity="0.2"/>
                                <Page/>
                            </Flex>

                            <Text color="white">Acompanhamento completo durante todo o processo, a fim de oferecer todo o suporte necessário.</Text>
                        </HStack>

                        <HStack px="4" py="4" borderRadius="7" spacing="8" _hover={{bg:"linear-gradient(181.69deg, rgba(255, 255, 255, 0.15) 30.32%, rgba(255, 255, 255, 0) 111.43%)"}}>
                            <Flex pos="relative" minH="63px" minW="63px" zIndex={2} alignItems="center" justifyContent={"center"}>
                                <Box pos="absolute" borderRadius="full" left="0" right="0" bottom="0" top="0" bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" zIndex={-1} opacity="0.2"/>
                                <Persons/>
                            </Flex>

                            <Text color="white">Profissionais capacitados para montar o melhor planejamento financeiro para você.</Text>
                        </HStack>
                    </Stack>

                    <Stack textAlign={"left"} spacing="8" w={["100%", "100%", "50%"]} alignItems="center" justifyContent={"center"}>
                        {/* <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Foco em experiência e resultado</Text> */}
                        <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Foco no cliente com o objetivo em trazer o melhor resultado.</Text>
                        <Text fontSize={"lg"} fontWeight="light" color="gray.200">Com serviços de qualidade que geram os melhores resultados de acordo com o seu propósito!</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Flex>

        <Flex m="0 auto" w="100%" pos="relative" bg="url(./images/parceiros.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Flex bg="linear-gradient(0.15deg, #212749 -1.94%, rgba(33, 39, 73, 0.19) 132.54%)" w="100%">
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="18%" px="6" flexDirection="column" alignItems="center">
                    <Stack spacing="16" maxW="800px" color="white" textAlign={"center"}  alignItems="center">
                        <Text fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Dê o primeiro passo para conquistar os seus sonhos</Text>
                        <Text fontSize={"xl"}>Uma consultoria especializada pode ajudá-lo a traçar o melhor plano para você atingir seus objetivos de maneira mais eficiente e segura.</Text>
                        <MainButton onClick={() => {callWhatsapp()}}>Faça seu Planejamento</MainButton>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>

        <Flex m="0 auto" w="100%" pos="relative">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="32" pb="40" px="6" flexDirection="column">
                <Stack spacing="16">
                    <Stack  spacing="8">
                        <Text color="blue.primary" fontSize={"52px"} fontWeight="medium">Corretor autorizado HS Consórcios</Text>
                        {/* <Text fontSize={"xl"}>Nossa empresa possui um histórico comprovado de excelência em serviços, aliado a medidas rigorosas de segurança, visamos sempre proporcionar aos nossos clientes uma experiência confiável e positiva.</Text> */}
                        <Text maxW="700px" fontSize={"md"}>Nossa empresa possui um histórico comprovado de excelência em serviços e atendimentos, aliado a medidas rigorosas de segurança. Visamos sempre proporcionar aos nossos clientes uma experiência única, de forma confiável e positiva.</Text>
                    </Stack>
                
                    <Stack spacing="16"  direction={["column", "column", "row"]}>
                        <Img w={["100%", "100%", "40%"]} src="./images/corretores.png" right="0" bottom="0" alt="Placas Solares - Tecnologia sofisticada"/>
                        <Stack spacing="20">
                            <SS_HS width="100%"/>
                            <Stack spacing="12">
                                <HStack spacing="6">
                                    <Flex w="35px">
                                        <Check width="35px"/>
                                    </Flex>
                                    <Text fontWeight={"normal"}>Transparência nas relações com clientes e parceiros.</Text>
                                </HStack>

                                <HStack spacing="6">
                                    <Flex w="35px">
                                        <Check width="35px"/>
                                    </Flex>
                                    <Text fontWeight={"normal"}>Respeito aos direitos dos consumidores.</Text>
                                </HStack>

                                <HStack spacing="6">
                                    <Flex w="35px">
                                        <Check width="35px"/>
                                    </Flex>
                                    <Text fontWeight={"normal"}>Comunicação clara e eficiente com os clientes.</Text>
                                </HStack>

                                <HStack spacing="6">
                                    <Flex w="35px">
                                        <Check width="35px"/>
                                    </Flex>
                                    <Text fontWeight={"normal"}>Garantia de privacidade e segurança das informações dos clientes.</Text>
                                </HStack>

                                <HStack spacing="6">
                                    <Flex w="35px">
                                        <Check width="35px"/>
                                    </Flex>
                                    <Text fontWeight={"normal"}>Equipe dedicada com profissionais qualificados e comprometidos com os objetivos dos nossos clientes</Text>
                                </HStack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Flex>

        <Flex m="0 auto" w="100%" pos="relative" bg="url(./images/hs.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Flex bg="linear-gradient(356.76deg, rgba(33, 39, 73, 0.37) 6.14%, #212749 122.55%)" w="100%">
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="center">
                    <Stack spacing="16" justifyContent={[ "left", "space-between" ]} direction={["column", "column", "row"]}>
                        <Stack w={["100%", "100%", "46%"]} color="white" spacing="24">
                            <Stack spacing="10">
                                <Text fontSize={["56px"]} fontWeight="medium" lineHeight={"58px"}>Sobre HS Consórcios</Text>
                                <Text fontSize={"xl"} fontWeight="light">Uma empresa do Grupo Herval de Dois Irmãos - RS, com mais de 30 anos de história, atua no mercado nacional e internacional, trabalha nos segmentos de imóveis, veículos e investimentos.</Text>
                                <Text fontSize={"xl"} fontWeight="light">Ao passar dos anos, a empresa se expandiu pelo Brasil, atualmente está entre as três maiores administradoras do país e é a maior administradora independente do ramo imobiliário!</Text>
                            </Stack>
                        
                            <Stack spacing="10" direction={["column", "column", "column", "row",]}>
                                <Stack>
                                    <Text fontSize={"3xl"} color="gray.300">Cotas ativas</Text>
                                    <Text fontSize={"56px"} fontWeight="medium" lineHeight={"60px"}>+200.000</Text>
                                </Stack>

                                <Stack>
                                    <Text fontSize={"3xl"} color="gray.300">Bens Entregues</Text>
                                    <Text fontSize={"56px"} fontWeight="medium" lineHeight={"60px"}>+80.000</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Img w={["100%", "100%", "46%"]} src="./images/mapa.png" right="0" bottom="0" alt="Placas Solares - Tecnologia sofisticada"/>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>

        <Flex id="clientes" m="0 auto" w="100%" pos="relative" bg="linear-gradient(285.92deg, #2D3250 17.26%, #181818 92.19%);">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24"  flexDirection="column" textAlign={"center"} >
                <Stack spacing="24" pos="relative">
                    <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"} px="6">Pessoas que depositam sua confiança em nossa expertise e soluções</Text>

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

                    <Slider {...settings}>
                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 0 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text py="14">O Robson é sinônimo de comprometimento, sempre responde rápido não importando a hora que o chamo, explica tudo quantas vezes forem preciso, em resumo seu atendimento é impecável! Já estou na segunda carta e não pretendo parar de comprar com ele!</Text>
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

                            <Stack zIndex={2} bg={activeSlide === 1 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text py="14">Nossa experiência com a S&S foi ótima. Robson conhece muito sobre investimentos e, como foi no nosso caso, sobre Consórcios. Transmite segurança e transparência na condução do contrato.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente1.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Katia Santos</Text>
                                    <Text color="gray.300">Admistradora Financeira</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 2 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text py="14">Quero aqui testemunhar o atendimento diferenciado da S&S através da pessoa do Robson que além de esclarecer as dúvidas sobre o investimento em consórcios nos orienta sobre a melhor forma de investir conforme nosso perfil e renda disponível no momento.</Text>
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
                            <Stack zIndex={2} bg={activeSlide === 3 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text py="14">Através do consórcio, adquirimos 10 cartas que nos aproximaram ainda mais do nosso tão sonhado objetivo. Estamos extremamente satisfeitos com o atendimento excepcional que recebemos, principalmente do Sr. Robson. Sua dedicação, conhecimento fizeram a diferença em cada etapa do processo...</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" h="60px !important" src='./images/cliente3.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>João Carlos E Lilian</Text>
                                    <Text color="gray.300">Empresário e Médica</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 4 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" minH="330px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text py="14">Robson me atende pela HS consórcio aonde com a ajuda dele consegui contemplar 5 cartas de crédito em 3 meses seguindo o que ele me indicava. Começou como meu corretor hoje é um grande amigo. Vários amigos meus fizeram consócio pela qualidade no atendimento! Te dá todo o suporte...</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" src='./images/cliente4.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Ronaldo Peruchini</Text>
                                    <Text color="gray.300">Proprietário Armazém da Venâncio</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Slider>

                </Stack>
            </Stack>
        </Flex>

        <Contact/>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.3155715277207!2d-51.163891723124564!3d-29.594511310560634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519455cfd1e5d49%3A0xdb424b8ee817576e!2sAv.%20Pres.%20Lucena%2C%203315%20-%20506%20-%20Centro%2C%20Ivoti%20-%20RS%2C%2093900-000!5e0!3m2!1spt-BR!2sbr!4v1686761463512!5m2!1spt-BR!2sbr" width="100%" height="450"></iframe>

        {/* <Flex id="contato" m="0 auto" w="100%" pos="relative" bg="url(./images/consultora.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Flex bg="linear-gradient(356.76deg, rgba(33, 39, 73, 0.37) 6.14%, #212749 122.55%)" w="100%">
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="left">
                    <Stack spacing="10" w="100%" maxW="600px">
                        <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Contato</Text>

                        <Input variant="white" name="subject" type="text" placeholder="Qual é o assunto da mensagem?" label='Assunto*'/>

                        <Input variant="white" name="name" type="text" placeholder="Qual é o seu nome?" label='Nome completo*'/>

                        <Input variant="white" name="email" type="text" placeholder="exemplo@email.com" label='E-mail*'/>

                        <Input variant="white" name="phone" type="text" placeholder="(DDD) x xxxx-xxxx" label='Telefone*'/>

                        <Input variant="white" as="textarea" name="message" type="text" placeholder="Digite aqui a sua mensagem..." label='Mensagem*' height="120px" resize={'unset'}/>

                        <MainButton type="submit">Enviar</MainButton>
                    </Stack>
                </Stack>
            </Flex>
        </Flex> */}

        <Footer/>
    </>
  )
}