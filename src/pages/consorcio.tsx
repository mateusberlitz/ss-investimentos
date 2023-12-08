import { useSimulador } from "@/contexts/SimuladorContext";
import { WeHelpYou } from "@/pageParts/WeHelpYou";
import { Box, Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Award, Calendar, DollarSign, Edit3, Home, Key, Star, Zap } from "react-feather";
import { OutlineButton } from "../components/Buttons/OutlineButton";
import { SolidButton } from "../components/Buttons/SolidButton";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import VerticalStep from "../components/VerticalStep";

export default function Consorcio(){
    const router = useRouter();
    const simulador = useSimulador();


    const [scrollHeight, setScrollHeight] = useState(0);
    const [lineParentHeight, setLineParentHeight] = useState(0);
    const [lineHeight, setLineHeight] = useState(1);

    const lineRef = useRef<HTMLDivElement>(null);

    const updateScrollHeight = () => {
        if(lineRef?.current){
            setLineHeight((- lineRef?.current?.getBoundingClientRect().top) + 120);
        }else{
            setLineHeight(window.scrollY - window.innerHeight);
        }
    }

    useEffect(() => {
        updateScrollHeight();
        window.addEventListener('scroll', updateScrollHeight);
    }, []);

    return(
        <Box position="relative">

            <Head>
                <title>Conheça o consórcio - Lance Consórcio</title>

                <meta name="description" content="O consórcio é um mecanismo financeiro para alocar dinheiro com segurança e garantia no objetivo certo."></meta>
            </Head>

            <Header whiteVersion={true}/>

            <Flex px="6" flexDir="column" w="100%" bg="url(https://cdn.discordapp.com/attachments/415479229858185218/932787457659904000/brooke-cagle-uWVWQ8gF8PE-unsplash_1.jpg)" backgroundSize={["auto 195%", "auto 185%", "cover", "115%"]} backgroundPosition="0px -190px">

                <Container as="main" pt="44" pb="36" color="white">
                    <Stack spacing="10" w="100%" maxW={["100%", "100%","50%"]}>
                        <Text>O QUE É CONSÓRCIO?</Text>

                        <Heading fontSize="6xl">Entenda como o consórcio funciona</Heading>

                        <Text fontSize="md">
                            Para esclarecer o andamento do seu consórcio de forma intuitiva.
                        </Text>

                        <Text>
                        </Text>

                        <Text>
                        </Text>
                    </Stack>
                </Container>
            </Flex>

            <Flex px="6" flexDir="column" w="100%">
                <Stack w="100%" m="0 auto" px="6" maxW="800px" py="20" pb ="36" spacing="12" pos="relative">
                    <Heading fontSize="6xl">Muito mais que um produto</Heading>

                    <Stack ref={lineRef} spacing="12" pos="relative" 
                        _before={{content: '""', pos: 'absolute', height: 'calc(100% - 100px)', width: '2px', bg: 'gray.200', left: '0', top: '100px'}}
                        _after={{content: '""', zIndex: '1', pos: 'absolute', height: lineHeight + 30, maxHeight: 'calc(100% - 100px)', width: '2px', bg: 'gradient', left: '0', top: '100px'}}
                        >
                        <VerticalStep title="Adesão ao plano" icon={Edit3} iconColor="red">
                            Para aderir a um consórcio, o interessado adquire uma cota e passa a integrar um grupo, o qual determina as características e a duração do plano. Assim, torna-se um “consorciado”.
                        </VerticalStep>

                        <VerticalStep title="Parcelas e reajustes" icon={DollarSign}>
                            O crédito total da cota, somado às taxas, é parcelado no prazo de pagamento do plano. Cada consorciado paga suas parcelas mensais, que formam o saldo de caixa para contemplar cada mês os seus integrantes até o encerramento do grupo. Sendo que anualmente as parcelas assim como o credito reajustam de acordo com o tipo do bem.
                        </VerticalStep>

                        <VerticalStep title="Contemplação" icon={Award}>
                            Este é o momento mais esperado, quando o consorciado tem o direito de utilizar o crédito para fazer a aquisição do seu bem. As contemplações são realizadas  por sorteio  ou lance, em assembleias mensais. O lance é um valor em número de parcelas que o cliente pode ofertar para tentar antecipar o recebimento do crédito e, quando vencedor, pode ser pago com recursos do consorciado ou com o próprio crédito da cota (conforme características do plano). 
                        </VerticalStep>

                        <VerticalStep title="Lances" icon={Zap}>
                            É uma forma de antecipar sua contemplação, sendo que em cada assembleia que ocorre mensalmente, sempre são realizadas contemplações por lances, no qual você pode dizer que anteciparia um determinado valor em parcelas. O maior número de parcelas vence e é contemplado.
                        </VerticalStep>

                        <VerticalStep title="Aquisição do bem" icon={Key}>
                            Com o crédito contemplado, o consorciado pode realizar a aquisição ou construção do bem de sua preferência, contando com a garantia de entrega e com o suporte que só a Lance Consórcio oferece. O consorciado deve passar por um processo de liberação e aprovação do crédito juntamente com a nossa equipe.
                        </VerticalStep>

                        <VerticalStep title="Encerramento" icon={Calendar}>
                            Por fim, há o encerramento do plano, que ocorre quando o consorciado finaliza seus direitos e suas obrigações com o grupo: recebeu o crédito do consórcio e quitou todas as suas parcelas.
                        </VerticalStep>
                    </Stack>
                </Stack>

                <WeHelpYou/>
            </Flex>

            <Footer/>
        </Box>
    )
}