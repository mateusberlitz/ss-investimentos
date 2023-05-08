import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ServiceItem } from "./ServiceItem";

export function Services(){
    return(
        <Stack m="0 auto" w="100%" pos="relative" mb="20">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" textAlign={"center"} alignItems="center">
                <Stack spacing="8" maxW="730px">
                    <Heading color="blue.primary" fontSize={"52px"}>Nossas Principais Soluções</Heading>
                    <Text fontSize={"xl"}>Confira abaixo nossas soluções que são capazes de atender aos mais diversos objetivos financeiros que você possa ter!</Text>
                </Stack>
            </Stack>

            <HStack h="480px" color="white" spacing="0" w="100%" overflowX={"auto"} overflowY="hidden" justifyContent={"left"}>
                <HStack spacing="0" h="480px" justifyContent={"left"}>
                    <ServiceItem title="Crescimento Patrimonial" subtitle="Crescimento Patrimonial" cover="./images/sl_real.jpg" active={true}>
                        Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos. 
                    </ServiceItem>
                    <ServiceItem title="Capital de Giro" subtitle="Capital de Giro" cover="./images/sl_grafico.jpg">
                        O capital de giro é essencial para manter a saúde financeira de uma empresa. Ele representa o dinheiro necessário para cobrir as despesas operacionais do negócio, como o pagamento de fornecedores e salários dos colaboradores. Conte com os nossos especialistas em crédito para liberar capital para a sua empresa com as melhores taxas do mercado.
                    </ServiceItem>
                    <ServiceItem title="Renda com Aluguéis" subtitle="Renda com Aluguéis" cover="./images/sl_predio.jpg">
                        Garanta novas fontes de renda passiva com investimentos imobiliários, nossos especialistas auxiliarão você a obter rentabilidade através de imóveis, para eles se pagarem e ainda gerar lucros para você.
                    </ServiceItem>
                    <ServiceItem title="Planos de Consórcio" subtitle="Consultoria Financeira" cover="./images/sl_freela.jpg">
                        Com o consórcio você obtém uma grande possibilidade de ganhos, sempre alinhado com segurança e facilidade. Você pode investir para aquisição de automóveis, imóveis, frotas, náuticos e muitos outros.
                    </ServiceItem>
                    <ServiceItem title="Consultoria Jurídica" subtitle="Consultoria Jurídica" cover="./images/sl_gondola.jpg">
                        Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, viabilize oportunidades e proteja o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                    </ServiceItem>
                    <ServiceItem title="Consultoria Contábil" subtitle="Consultoria Contábil" cover="./images/sl_contabil.jpg">
                        Uma boa assessoria contábil é fundamental para a saúde financeira da sua empresa. Além de garantir que as obrigações fiscais e tributárias sejam cumpridas de forma correta, ela ajuda a otimizar processos, reduzir custos, ampliar seus ganhos e identificar oportunidades de crescimento. Com uma equipe de contadores experientes ao seu lado, você pode tomar decisões mais precisas e estratégicas para o seu negócio.
                    </ServiceItem>
                </HStack>
            </HStack>
        </Stack>
    )
}