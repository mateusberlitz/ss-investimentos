import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Avatar, Box, Flex, Heading, HStack, Img, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
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
import { useSimulador } from '@/contexts/SimuladorContext';
import { HeaderAlt } from '@/components/Header/HeaderAlt';


export default function Home() {

    const [activeSlide, setActiveSlide] = useState(0);

    const isWideVersion = useBreakpointValue({base: false, lg: true,});
    const isMobile = useBreakpointValue({base: true, sm: false,});

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
        window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=Olá Robson!\nGostaria de obter uma consultoria personalizada.`, '_blank');
    }

    const simulador = useSimulador();

    return (
    <>
        <Head>
            <title>S&S Investimentos - Soluções financeiras para sua alavancagem patrimonial</title>

            <meta name="description" content="Fornecemos o meio financeiro para você adquirir imóveis, veículos, investimentos e alavancar seu patrimônio."></meta>
        </Head>

        <Loading/>

        <Flex flexDir="column" w="100%" bg="url(./images/real.jpg)" backgroundSize="cover" backgroundPosition="0 0px">
            <Box bg="linear-gradient(3.06deg, rgba(45, 50, 80, 0.43) -20.72%, #181818 93.12%)" _before={{}}>
                <Flex flexDir="column">
                    <HeaderAlt/>
                </Flex>
                
                <Stack px="6" w="100%" maxW="1200px" m="0 auto" py="20">
                    <Stack alignItems={"flex-start"} direction={["column","column","row","row"]} spacing={"24"}>
                        <Stack textAlign={"left"} alignItems={"left"}  spacing="16" w={["100%", "100%", "50%", "50%"]}>
                            <TextTag textTransform={"uppercase"} letterSpacing={"5px"}>Novo Método</TextTag>
                            <Heading color="#D59665" fontSize={["42px"]} fontWeight="regular">Invista, Adquira e rentabilize o seu dinheiro</Heading>
                            <Text color={"#ffffff"} fontSize={"28px"}>Veja a estratégia do especialista de investimentos que já ajudou milhares de pessoas em seu sucesso financeiro.</Text>
                        
                            <HStack spacing={"8"}>
                                <Img src='./images/custumers.png'/>
                                <Img src='./images/Stars.svg'/>
                            </HStack>
                        </Stack>

                        <VStack w={["100%", "100%", "50%", "50%"]} alignContent={"left"} spacing={"4"}>
                            
                            <Img maxWidth={"450px"} src='./images/video.png'/>

                            <VStack>
                                <Heading color="#ffffff">Robson Seibel</Heading>
                                <Text color="#dbdbdb">Fundador da S&S Soluções e Investimentos</Text>
                                <Text fontWeight={"semibold"} color="#D59665">Diversas premiações de nivel nacional</Text>
                            </VStack>
                        </VStack>
                    </Stack>
                </Stack>
            </Box>
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
                                    <Text>Ao contemplar você vai para o segundo estágio do investimento.</Text>
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

        <Flex m="0 auto" w="100%" pos="relative" bg="#ffffff" backgroundSize="cover" backgroundPosition="0 0px">
           
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

                    <HStack display={"flex"} spacing={"12"} w={"100%"} justifyContent={"center"} textAlign={"center"} py="14">
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Sem Juros</Text>
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Sem Entrada</Text>
                        <Text color={"#D59665"} textTransform={"uppercase"} fontWeight={"bold"} fontSize={"32px"}>Pague Apenas meia Parcela</Text>
                    </HStack>

                    <Flex width={"100%"} justifyContent={"center"} textAlign={"center"}>
                        <MainButton>Simule Seu Investimento</MainButton>
                    </Flex>
                </Stack>

            </Stack>

        </Flex>

        

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
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Robson me atende pela HS consórcio aonde com a ajuda dele consegui contemplar 5 cartas de crédito em 3 meses seguindo o que ele me indicava. Começou como meu corretor hoje é um grande amigo. Vários amigos meus fizeram consócio pela qualidade no atendimento! Te dá todo o suporte...</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" src='./images/cliente4.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Ronaldo Peruchini</Text>
                                    <Text color="gray.300">Proprietário Armazém da Venâncio</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 5 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
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
                            <Stack zIndex={2} bg={activeSlide === 6 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
                                <Quote/>
                                <Text fontSize={["sm", "sm", "sm", "sm", "md"]}>Depois que fomos contemplados e percebemos que nosso maior sonho estava na ponta do lápis para se concretizar nunca mais ficamos sem. O consórcio serve para você conquistar o que deseja de maneira bem planejada e sem pagar juros, e assim, conquistamos nosso lar e um carro na época e assim, fomos realizando os nossos sonhos.</Text>
                            </Stack>

                            <Stack zIndex={2} alignItems={"center"} mt="-35px !important" spacing="4">
                                <Avatar size="lg" w="60px !important" src='./images/cliente7.jpg'/>
                                <Stack spacing="0">
                                    <Text bg="linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%);" backgroundClip={"text"} fontSize="lg" fontWeight={"semibold"}>Patrícia e Antônio Klauck</Text>
                                    <Text color="gray.300">Professora e Chefe de Setor</Text>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems={"center"} color="white">
                            <Stack zIndex={2} bg={activeSlide === 7 ? "blue.primary" : "rgba(255,255,255,0.2)"} maxW={400} alignItems={"center"} px="5" py="7" h="300px" borderRadius={"10px"} w="100%">
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

                                <MainButton>Simule seu Investimento</MainButton>

                            </Stack>

                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>

        <Footer/>
    </>
  )
}