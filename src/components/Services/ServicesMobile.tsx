import { Flex, Stack } from "@chakra-ui/react";
import { ServiceItemMobile } from "./ServiceItemMobile";

export function ServicesMobile(){
    return(
        <Flex m="0 auto" w="100%" pos="relative" mb="20">
            <Stack w="100%"  m="0 auto" p={["0", "auto" ]} py="24" px="6" color="white" spacing="8">
                <ServiceItemMobile overflow={"hidden"} title="Crescimento Patrimonial" subtitle="Crescimento Patrimonial" cover="./images/sl_real.jpg">
                    Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos. 
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Capital de Giro Empresarial" subtitle="Capital de Giro" cover="./images/sl_grafico.jpg">
                            O capital de giro é essencial para manter a saúde financeira de uma empresa. Ele representa o dinheiro necessário para cobrir as despesas operacionais do negócio, como o pagamento de fornecedores e salários dos colaboradores. Conte com os nossos especialistas em crédito para liberar capital para a sua empresa com as melhores taxas do mercado.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Investimentos Imobiliários" subtitle="Consultoria Financeira" cover="./images/sl_predio.jpg">
                    Garanta novas fontes de renda ativa e passiva para você ou sua empresa através de investimentos imobiliários, nossos especialistas auxiliarão você a adquirir imóveis com as melhores condições para obter lucros passivos ou rentabilizar o seu negócio de forma ativa.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Consultoria Financeira" subtitle="Consultoria Financeira" cover="./images/sl_aperto.jpg">
                    Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Complemento de Aposentadoria" subtitle="Consultoria Jurídica" cover="./images/sl_olds.jpg">
                    Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, viabilize oportunidades e proteja o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Consultoria Jurídica" subtitle="Consultoria Jurídica" cover="./images/sl_gondola.jpg">
                    Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, viabilize oportunidades e proteja o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} title="Consultoria Contábil" subtitle="Consultoria Contábil" cover="./images/sl_contabil.jpg">
                    Uma boa assessoria contábil é fundamental para a saúde financeira da sua empresa. Além de garantir que as obrigações fiscais e tributárias sejam cumpridas de forma correta, ela ajuda a otimizar processos, reduzir custos, ampliar seus ganhos e identificar oportunidades de crescimento. Com uma equipe de contadores experientes ao seu lado, você pode tomar decisões mais precisas e estratégicas para o seu negócio.
                </ServiceItemMobile>
            </Stack>
        </Flex>
    )
}