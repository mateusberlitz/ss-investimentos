import { Flex, Heading, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import { ServiceItem } from "./ServiceItem";

export function ServicesTwo(){
    const isWideVersion = useBreakpointValue({base: false, lg: true,});

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: isWideVersion ? 3 : 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 800,
        variableWidth: true,
        arrows: false,
        cssEase: "linear"
    };

    return(
        <>
            <Stack m="0 auto" w="100%" pos="relative">
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} pt="36" flexDirection="column" textAlign={"center"} alignItems="center">
                    <Stack spacing="8" maxW="730px">
                        <Heading color="blue.primary" fontSize={"52px"}>Nossas Principais Soluções</Heading>
                        <Text fontSize={"xl"}>Confira abaixo nossas soluções que são capazes de atender aos mais diversos objetivos que você possa ter!</Text>
                    </Stack>
                </Stack>
            </Stack>

            <Flex m="0 auto" w="100%" pos="relative" mb="-2">
                <Stack w="100%"  m="0 auto" p={["0", "auto" ]} pt="24" px="0" color="white" spacing="0">
                        <Slider {...settings}>
                            <ServiceItem h="480px" overflow={"hidden"} title="Crescimento Patrimonial" subtitle="Crescimento Patrimonial" cover="./images/sl_real.jpg" active={true}>
                                Aumente o seu patrimônio ou de sua empresa para potencializar as suas fontes de renda, confira com nossa equipe estratégias para aquisição de frotas, imóveis e obtenção de lucros para rentabilizar o seu dinheiro de forma arrojada sem se descapitalizar. 
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Capital de Giro" subtitle="Capital de Giro" cover="./images/sl_grafico.jpg">
                                O capital de giro é essencial para manter a saúde financeira de uma empresa. Ele representa o dinheiro necessário para cobrir as despesas operacionais do negócio, como o pagamento de fornecedores e salários dos colaboradores. Conte com os nossos especialistas em crédito para liberar capital para a sua empresa com as melhores taxas do mercado.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Investimentos Imobiliários" subtitle="Consultoria Financeira" cover="./images/sl_predio.jpg">
                                Garanta novas fontes de renda ativa e passiva para você ou sua empresa através de investimentos imobiliários, nossos especialistas auxiliarão você a adquirir imóveis com as melhores condições para obter lucros passivos ou rentabilizar o seu negócio de forma ativa.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Consultoria Financeira" subtitle="Consultoria Financeira" cover="./images/sl_aperto.jpg">
                                Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Aposentadoria planejada" subtitle="Consultoria Financeira" cover="./images/sl_olds.jpg">
                                Um planejamento financeiro para garantir uma aposentadoria digna e confortável, com a nossa equipe você pode planejar de forma antecipada a sua aposentadoria, para chegar na melhor idade com segurança e tranquilidade.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Consultoria Jurídica" subtitle="Consultoria Jurídica" cover="./images/sl_gondola.jpg">
                                Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, viabilize oportunidades e proteja o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Seguro e Previdência" subtitle="Seguro e Previdência" cover="./images/sl_freela.jpg">
                                Desfrute da segurança e da tranquilidade que você e sua família merecem, conte com seguros de vida e previdência privada para proteger você, sua família. Contrate também para sua empresa e colaboradores, para garantir diversos benefícios e vantagens fiscais.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Agronegócio" subtitle="Agronegócio" cover="./images/sl_agro.jpg">
                                Invista para o desenvolvimento da sua produção rural através de implementos agrícolas. Expanda a capacidade produtiva do seu negócio rural, trazendo mais tecnologia para o seu trabalho com a aquisição ou renovação de maquinário.
                            </ServiceItem>
                            <ServiceItem h="480px" overflow={"hidden"} title="Consultoria Contábil" subtitle="Consultoria Contábil" cover="./images/sl_contabil.jpg">
                                Uma boa assessoria contábil é fundamental para a saúde financeira da sua empresa. Além de garantir que as obrigações fiscais e tributárias sejam cumpridas de forma correta, ela ajuda a otimizar processos, reduzir custos, ampliar seus ganhos e identificar oportunidades de crescimento. Com uma equipe de contadores experientes ao seu lado, você pode tomar decisões mais precisas e estratégicas para o seu negócio.
                            </ServiceItem>
                        </Slider>
                </Stack>
            </Flex>
        </>
    )
}