import { Flex, Stack } from "@chakra-ui/react";
import { ServiceItemMobile } from "./ServiceItemMobile";

export function ServicesMobile(){
    return(
        <Flex m="0 auto" w="100%" pos="relative" mb="20">
            <Stack w="100%"  m="0 auto" p={["0", "auto" ]} py="24" px="6" color="white" spacing="8">
                <ServiceItemMobile overflow={"hidden"} 
                title="Crescimento Patrimonial" 
                subtitle="Crescimento Patrimonial" 
                cover="./images/sl_real.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria para aumento patrimonial.`}>
                    Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos. 
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Capital de Giro Empresarial" 
                subtitle="Capital de Giro" 
                cover="./images/sl_grafico.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria para capital de giro empresarial.`}>
                            O capital de giro é essencial para manter a saúde financeira de uma empresa. Ele representa o dinheiro necessário para cobrir as despesas operacionais do negócio, como o pagamento de fornecedores e salários dos colaboradores. Conte com os nossos especialistas em crédito para liberar capital para a sua empresa com as melhores taxas do mercado.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Investimentos Imobiliários" 
                subtitle="Consultoria Financeira" 
                cover="./images/sl_predio.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria em investimentos imobiliários.`}>
                    Garanta novas fontes de renda ativa e passiva para você ou sua empresa através de investimentos imobiliários, nossos especialistas auxiliarão você a adquirir imóveis com as melhores condições para obter lucros passivos ou rentabilizar o seu negócio de forma ativa.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Consultoria Financeira" 
                subtitle="Consultoria Financeira" 
                cover="./images/sl_aperto.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria financeira.`}>
                    Receba uma consultoria de investimentos exclusiva para investir de forma segura, planejada e lucrativa para alavancar o seu patrimônio. Para objetivos de curto a longo prazo, conte com a nossa assessoria qualificada com estratégias claras para alcançar seus objetivos.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Aposentadoria planejada" 
                subtitle="Consultoria Jurídica" 
                cover="./images/sl_olds.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria para aposentadoria.`}>
                    Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, viabilize oportunidades e proteja o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Assessoria Jurídica" 
                subtitle="Assessoria Jurídica" 
                cover="./images/sl_gondola.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria jurídica.`}>
                    Conte com a nossa equipe jurídica para avaliar questões legais da sua empresa, revisar contratos, viabilizar oportunidades e proteger o seu patrimônio de forma correta. Previna riscos, litígios e resolva questões legais complexas.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Seguro e Previdência" 
                subtitle="Seguro e Previdência" 
                cover="./images/sl_freela.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria para seguro e previdência.`}>
                    Desfrute da segurança e da tranquilidade que você e sua família merecem, conte com seguros de vida e previdência privada para proteger você, sua família. Contrate também para sua empresa e colaboradores, para garantir diversos benefícios e vantagens fiscais.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Investimento Agronegócio" 
                subtitle="Agronegócio" 
                cover="./images/sl_agro.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria para investimento em agronegócio.`}>
                    Invista para o desenvolvimento da sua produção rural através de implementos agrícolas. Expanda a capacidade produtiva do seu negócio rural, trazendo mais tecnologia para o seu trabalho com a aquisição ou renovação de maquinário.
                </ServiceItemMobile>
                <ServiceItemMobile overflow={"hidden"} 
                title="Consultoria Contábil" 
                subtitle="Consultoria Contábil" 
                cover="./images/sl_contabil.jpg"
                callText={`Olá Robson!\nGostaria de obter uma consultoria contábil.`}>
                    Uma boa assessoria contábil é fundamental para a saúde financeira da sua empresa. Além de garantir que as obrigações fiscais e tributárias sejam cumpridas de forma correta, ela ajuda a otimizar processos, reduzir custos, ampliar seus ganhos e identificar oportunidades de crescimento. Com uma equipe de contadores experientes ao seu lado, você pode tomar decisões mais precisas e estratégicas para o seu negócio.
                </ServiceItemMobile>
            </Stack>
        </Flex>
    )
}