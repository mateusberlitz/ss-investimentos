import React, { useEffect, useLayoutEffect, useRef } from "react";

import { Box, Flex, Heading, HStack, Img, Progress, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Calendar, DollarSign, Feather, Shield } from "react-feather";

import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

import SS from '../../../public/ss.svg';

export function StepsSectionClean(){
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const firstStep = useRef(null);
    const secondStep = useRef(null);
    const thirdStep = useRef(null);
    const fourthStep = useRef(null);
    const platesImgRef = useRef(null);

    const isWideVersion = useBreakpointValue({
        sm: false,
        md: true,
    });

    const isMobile = useBreakpointValue({base: true, sm: false,});

    useLayoutEffect(() => {

        // const showUpSecondItem = gsap.fromTo(secondStep.current, { 
        //     y: 90,
        //     autoAlpha: 0,
        // },{ 
        //     duration: 1,
        //     y: 0,
        //     autoAlpha: 1,
        // });

        // const showUpThirdItem = gsap.fromTo(thirdStep.current, { 
        //     y: 90,
        //     autoAlpha: 0,
        // },{ 
        //     duration: 1,
        //     y: 0,
        //     autoAlpha: 1,
        // });

        // const showUpFourthItem = gsap.fromTo(fourthStep.current, { 
        //     y: 90,
        //     autoAlpha: 0,
        // },{ 
        //     duration: 1,
        //     y: 0,
        //     autoAlpha: 1,
        // });
        
        if(!isMobile){
            const ctx = gsap.context(() => {
                const progress = gsap.to(progressRef.current, { 
                    height: "calc(100%)",
                    ease: "none"
                });
                
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    scrub: true,
                    start: "top bottom-=200px",
                    animation: progress
                });

                const steps = gsap.utils.toArray<HTMLElement>('.step');

                steps.forEach((step, i) => {
                    const fadeShow = gsap.fromTo(step, { 
                        autoAlpha: 0,
                        y: 50
                    }, { 
                        autoAlpha: 1,
                        y: 0
                    });

                    console.log(i);

                    ScrollTrigger.create({
                        trigger: step,
                        animation: fadeShow,
                        once: true,
                        start: "top bottom-=200px",
                        //markers: true,
                        toggleActions: 'play none none none',
                    });
                })

                // gsap.utils.toArray('.step').forEach(box => {
                //     gsap.fromTo('.step', {
                //         autoAlpha: 0, 
                //         y: 50
                //       }, {
                //       scrollTrigger: {
                //         trigger: '.step',
                //         once: true,
                //         markers: true,
                //         toggleActions: 'play none none none',
                //       },
                //       duration: 1, 
                //       autoAlpha: 1, 
                //       y: 0
                //     });
                // });
            });
              
            return () => ctx.revert();
        }

        
    }, [isWideVersion]);
    
    return (
        <Flex id="sobre" m="0 auto" w="100%" pos="relative" ref={sectionRef}>
            <Flex direction="column" w="100%" >
                <Flex w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px={["1","6","6","6"]} flexDirection="column" pos="relative">

                    <Stack spacing="10" justifyContent={[ "left", "space-between" ]} direction={["column", "column", "row"]} pos="relative">

                        <Stack spacing="16" w={["100%", "100%", "50%"]} display={["flex", "flex", "flex", "flex", "flex"]} pt="5">
                            <Stack spacing="16" position="sticky" top="140px">
                                <Stack>
                                    <Stack spacing="4">
                                        <Text>Sobre nós</Text>
                                        <Heading color="blue.primary">Somos a experiência de resultado!</Heading>
                                    </Stack>
                                    {/* <HStack alignItems={"center"}>
                                        <Flex maxW="50px"><SS/></Flex>
                                        <Heading color="blue.primary" pt="3">Investimentos</Heading>
                                    </HStack> */}
                                </Stack>
                                <Img src="./../images/robson.png"  w={["100%"]} right="0" bottom="0" alt="Placas Solares - Tecnologia sofisticada"/>
                            </Stack>
                        </Stack>

                        <HStack w={["100%", "100%", "70%", "100%"]} p={["7"]} spacing={["8", "8", "14"]} maxW="700px">
                            <Stack h="100%" pos="relative">
                                <Box h="calc(100%)" w="4px" bg="gray.500"/>
                                <Box ref={progressRef} h="0%" w="4px" bg="#7C5333" pos="absolute" top="0"/>
                                {/* <Progress orientation="vertical" size='md' value={55} w="4px" h="100%"/> */}
                            </Stack>

                            <Stack spacing="32">
                                {/* <Stack spacing="7">
                                    <Text fontSize={"4xl"}>Vantagens</Text>
                                    <Heading fontSize={"48px"}>Como você pode obter?</Heading>
                                    <Text fontSize={"lg"}>Você pode pagar a prazo por um crédito para ter sua casa ou estabelecimento totalmente abastecida com energia limpa.</Text>
                                </Stack> */}
                            
                                <Stack ml={["-23% !important", "-11% !important", "-22% !important", "-17.5% !important", "-17% !important", "-15% !important"]} spacing="24">
                                    <HStack spacing="30px" className="step">
                                        <Flex alignSelf="baseline" h={["50px","60px","60px","60px","60px"]} w={["50px","60px","60px","60px","60px"]} bg="gradient" borderRadius="full" backdropFilter={"blur(45px)"} justifyContent={"center"} alignItems="center">
                                            <Text color="white" fontSize={"2xl"}>1</Text>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={["2xl", "4xl", "4xl"]} fontWeight="normal" color="blue.primary">Início de tudo</Text>
                                            <HStack>
                                                <Text fontSize={"lg"} fontWeight="light" color="blue.secondary">2010-2011</Text>
                                            </HStack>
                                            <Text fontSize={"lg"} fontWeight="light" color="gray.text">A nossa caminhada dentro do ramo de consórcios e investimentos, se deu início através de um convite para integrar a equipe da Weiss Consórcios, na cidade de Dois Irmãos, sede da HS Consórcios. Por lá efetivamos muitos negócios e ajudamos a impulsionar o consórcio como um método eficaz de aquisição e investimento.</Text>
                                        </Stack>
                                    </HStack>

                                    <HStack spacing="30px" className="step">
                                        <Flex alignSelf="baseline" h={["50px","60px","60px","60px","60px"]} w={["50px","60px","60px","60px","60px"]} bg="gradient" borderRadius="full" backdropFilter={"blur(45px)"} justifyContent={"center"} alignItems="center">
                                            <Text color="white" fontSize={"2xl"}>2</Text>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={["2xl", "4xl", "4xl"]} fontWeight="normal" color="blue.primary">Expansão</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="blue.secondary">2014-2015</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="gray.text">Sempre buscamos fortalecer o relacionamento com os nossos clientes e parceiros foi imprescindível estreitar laços junto a HS Consórcios, então montamos um escritório maior e mais moderno em frente à sede da administradora, trazendo assim agilidade e otimização dos processos de liberação de crédito bem como transparência e credibilidade.</Text>
                                        </Stack>
                                    </HStack>


                                    <HStack spacing="30px" className="step">
                                        <Flex alignSelf="baseline" h={["50px","60px","60px","60px","60px"]} w={["50px","60px","60px","60px","60px"]} bg="gradient" borderRadius="full" backdropFilter={"blur(45px)"} justifyContent={"center"} alignItems="center">
                                            <Text color="white" fontSize={"2xl"}>3</Text>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={["2xl", "4xl", "4xl"]} fontWeight="normal" color="blue.primary">Reconhecimento</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="blue.secondary">2017-2018</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="gray.text">Como consequência do nosso esforço e dedicação, trabalhamos como referência desde 2013, estando presente nas premiações da HS Consórcios entre as 5 maiores empresas do ramo a nível Brasil desde então. Em 2017 recebemos o prêmio de destaque nacional como a corretora campeã dentre 600 corretores autorizados da HS Consórcios. Os créditos comercializados neste período foram sempre direcionados para investimentos e aquisições de bens móveis e imóveis.</Text>
                                        </Stack>
                                    </HStack>

                                    <HStack spacing="30px" className="step">
                                        <Flex alignSelf="baseline" h={["50px","60px","60px","60px","60px"]} w={["50px","60px","60px","60px","60px"]} bg="gradient" borderRadius="full" backdropFilter={"blur(45px)"} justifyContent={"center"} alignItems="center">
                                            <Text color="white" fontSize={"2xl"}>4</Text>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={["2xl", "4xl", "4xl"]} fontWeight="normal" color="blue.primary">Nova Parceria</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="blue.secondary">2019-2023</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="gray.text">Em dezembro de 2019, fizemos uma nova parceria com a Lance Consórcio, ajudamos a otimizar números e expandimos mediante a uma pandemia global. Neste período, ajudamos a empresa a buscar seu espaço entre as melhores e maiores corretoras da HS Consórcios sendo reconhecidos nacionalmente pelos números atingidos. Formamos uma equipe coesa, bem treinada e capacitada, com excelente gestão e uma equipe de vendas.</Text>
                                        </Stack>
                                    </HStack>

                                    <HStack spacing="30px" className="step">
                                        <Flex alignSelf="baseline" h={["50px","60px","60px","60px","60px"]} w={["50px","60px","60px","60px","60px"]} bg="gradient" borderRadius="full" backdropFilter={"blur(45px)"} justifyContent={"center"} alignItems="center">
                                            <Text color="white" fontSize={"2xl"}>5</Text>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={["2xl", "4xl", "4xl"]} fontWeight="normal" color="blue.primary">Novo ciclo</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="blue.secondary">2023</Text>
                                            <Text fontSize={"lg"} fontWeight="light" color="gray.text">Em 2023, a SS Soluções & Investimentos foi oficialmente fundada. Com toda a experiência e conhecimento adquirido por nossa equipe durante todos estes anos, estamos preparados para lhe auxiliar da melhor forma nas suas escolhas, sejam elas para aquisições ou investimentos.</Text>
                                        </Stack>
                                    </HStack>
{/* 
                                    <HStack ref={secondStep} spacing="30px" visibility="hidden" opacity="0">
                                        <Flex h="60px" w="60px" bg="rgba(255, 255, 255, 0.45)" backdropFilter={"blur(45px)"} borderRadius="15px" justifyContent={"center"} alignItems="center">
                                            <Calendar/>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={"xl"} fontWeight="semibold">Longo Prazo</Text>
                                            <Text fontSize={"lg"}>As placas e equipamentos tem duração de mais de 20 anos, baixa necessidade de manutenção e alta taxa de eficiência</Text>
                                        </Stack>
                                    </HStack>

                                    <HStack ref={thirdStep} spacing="30px" visibility="hidden" opacity="0">
                                        <Flex h="60px" w="60px" bg="rgba(255, 255, 255, 0.45)" backdropFilter={"blur(45px)"} borderRadius="15px" justifyContent={"center"} alignItems="center">
                                            <Feather/>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={"xl"} fontWeight="semibold">Sustentabilidade</Text>
                                            <Text fontSize={"lg"}>Você ajuda o meio ambiente sem depender de energia de fontes poluentes, e tem sua própria usina de energia 100% limpa.</Text>
                                        </Stack>
                                    </HStack>

                                    <HStack ref={fourthStep} spacing="30px" visibility="hidden" opacity="0">
                                        <Flex h="60px" w="60px" bg="rgba(255, 255, 255, 0.45)" backdropFilter={"blur(45px)"} borderRadius="15px" justifyContent={"center"} alignItems="center">
                                            <Shield/>
                                        </Flex>
                                        <Stack w="calc(100% - 90px)">
                                            <Text fontSize={"xl"} fontWeight="semibold">Proteção</Text>
                                            <Text fontSize={"lg"}>No longo prazo, a tendência é sofrer dos aumentos constantes do custo da energia. Com sua própria energia você não é afetado.</Text>
                                        </Stack>
                                    </HStack> */}
                                </Stack>
                            </Stack>
                        </HStack>
                    
                    </Stack>
                </Flex>
            </Flex>
        </Flex>
    )
}