import { Box, Flex, Heading, HStack, Img, SimpleGrid, Stack, Text, Link as ChakraLink, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { OutlineButton } from '../components/Buttons/OutlineButton'
import { SolidButton } from '../components/Buttons/SolidButton'
import { Header } from '../components/Header'
import { IconTitleItem } from '../components/IconTitleItem.tsx'
import { TopCard } from '../components/TopCard'
import { TextTag } from '../components/TextTag'
import { Check } from 'react-feather'
import { useRouter } from 'next/router'
import { MainButton } from '../components/Buttons/MainButton'
import { Footer } from '../components/Footer'

import Dollar from '../../public/icons/dollar-sign.svg';
import Percent from '../../public/icons/percent.svg';
import RoadSign from '../../public/icons/road-sign.svg';
import Wallet from '../../public/icons/wallet.svg';
import { Input } from '../components/Forms/Inputs/Input'
import { Select } from '../components/Forms/Selects/Select'
import { ReactSelect } from '../components/Forms/Selects/ReactSelect'
import { Simulador } from '../components/Simulador'
import { useSimulador } from '@/contexts/SimuladorContext'
import { WeHelpYou } from '@/pageParts/WeHelpYou'

export default function Veiculos(){
  const router = useRouter();

  const simulador = useSimulador();

  return (
    <Box position="relative">

      <Head>
        <title>Investimentos - S&S Investimentos</title>

        <meta name="description" content="Invista no futuro para garantir uma renda maior através do consórcio. Entenda como você pode."></meta>
      </Head>

      <Flex flexDir="column" w="100%" px="6" bg="url(https://cdn.discordapp.com/attachments/415479229858185218/933518685803540510/invest_woman_1.jpg)" backgroundSize="cover" backgroundPosition="0 0px">

        <Flex flexDir="column" bg="rgba(0,0,0,0.4)" backdropFilter={"blur(30px)"}>
            <Header fixed={true}/>
        </Flex>

        <Stack as="main" w="100%" maxW="1200px" m="0 auto" pt="44" pb="36" color="white">
          <Stack spacing="10" w="100%" maxW={["100%", "70%","50%"]}>
            <Text>CONSÓRCIO COMO INVESTIMENTO</Text>

            <Heading fontSize={["5xl","5xl","6xl"]}>Estratégias para obter rendimentos com o consórcio.</Heading>

            <Text>
              Invista no futuro para garantir uma renda maior através do consórcio. Entenda como você pode.
            </Text>

            <OutlineButton size="lg" borderColor="#444" _hover={{borderColor: '#fff'}} onClick={simulador.handleOpenSimulador}>
              Simular um crédito
            </OutlineButton>
          </Stack>
        </Stack>
      </Flex>

      <Flex flexDir="column" w="100%" px="6">

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="32" spacing="8" justifyContent="space-between">
          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <HStack justifyContent="space-between">
              <TextTag>JUROS SOBRE O CRÉDITO</TextTag>

              <Link href="/consorcio">
                  <ChakraLink href="/consorcio">
                      <Text fontSize="sm">O que é consórcio?</Text>
                  </ChakraLink>
              </Link>
            </HStack>

            <Heading fontSize={["5xl","5xl","6xl"]}>Renda extra e aposentadoria.</Heading>

            <Text>Ao contemplar você pode escolher por deixar seu crédito aplicado, o qual passa a render <b>Juros compostos</b> de 100% do CDI, e isso deve alavancar muito o seu capital pois acrescenta o <b>valor do crédito</b> e não o valor pago! Veja mais detalhes</Text>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/happy_family.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Stack>

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="20" spacing="8" justifyContent="space-between">
          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/dealing_house.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>Renda mensal</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Coloque seu imóvel para alugar.</Heading>

            <Text>Você pode comprar um imóvel ou construir para alugá-lo e receber uma renda mensal.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>
        </Stack>

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="20" spacing="8" justifyContent="space-between">
          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>LUCRO</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Contemplar e vender</Heading>

            <Text>Caso seja contemplado cedo, aproximadamente até 40% do prazo total, você pode optar por vender sua cota de consórcio para o nosso escritório e garantir um lucro em cima do valor que desembolsou.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/cliente_contemplado.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>
        </Stack>

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="20" spacing="8" justifyContent="space-between">
          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/ap.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>IMÓVEIS</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Compre imóveis na planta</Heading>

            <Text>Adquirir um imóvel na planta é um ótimo negócio para valorização do bem ou até alugar posteriormente partindo de parcelas pequenas do consórcio.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>
        </Stack>

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="20" spacing="8" justifyContent="space-between">
          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>NA PRÁTICA</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Como usar sua carta?</Heading>

            <Text fontWeight="bold">
             <span style={{color: 'gray'}}>-</span> Comprar novos e seminovos com até 10 anos<span style={{color: 'gray'}}>.</span> <br />
             <span style={{color: 'gray'}}>-</span> Usar o veículo antigo como lance e o crédito na compra<span style={{color: 'gray'}}>.</span> <br />
            </Text>

            <Text>Sempre que contemplado, para poder utilizar o crédito o sorteado deve passar pelo <b>processo de liberação</b>, nos quais depende do tipo do imóvel desejado.</Text>
          
            <MainButton size="lg">
              Simular
            </MainButton>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/casal_comprando.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Stack>

        <Stack direction={["column", "column", "row"]} w="100%" maxW="1200px" m="0 auto" py="20" pb="32" spacing="8" justifyContent="space-between">
          <Stack w={["100%", "100%","40%"]}>
            <Table borderRadius="4px" overflow="hidden">
              <Thead>
                <Tr>
                    <Th bg="blue.primary" fontSize="sm" py="16px" color="white">Parte</Th>
                    <Th bg="blue.primary" fontSize="sm" py="16px" color="white">Valor</Th>
                </Tr>
              </Thead>
              <Tbody fontSize="sm">
                <Tr>
                  <Td bg="gray.200">Crédito</Td>
                  <Td bg="gray.200">R$56.270,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Taxa de adm.(15%)</Td>
                  <Td bg="gray.200">R$8.440,50</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Fundo reserva.(1%)</Td>
                  <Td bg="gray.200">R$562,70</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Juros (0%)</Td>
                  <Td bg="gray.200">R$0,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontWeight="bold">Total</Td>
                  <Td bg="gray.200" fontWeight="bold">R$65.273,20</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Prazo: 100 meses</Th>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Meia parcela: R$326,36</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Stack>

          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>EXEMPLO</TextTag>

            <Heading fontSize="5xl">O que compõe a parcela?</Heading>

            <Text fontSize="lg">A <b>meia parcela</b> é um recurso exclusivo da administradora <b>HS consórcios</b>, no qual você paga este valor reduzido até ser <b>contemplado</b>, e então depois passa a pagar a parcela integralmente mas já com o bem em mãos.</Text>
          </Stack>
        </Stack>

        <Stack spacing="12" w="100%" maxW="1200px" m="0 auto" py="20">
          <TextTag>CARACTERÍSTICAS</TextTag>

          <SimpleGrid columns={[1,1,3]} spacing={[10,8,6]}>
            <IconTitleItem title="Poder de negociação"
              divider={false}
                icon={<Dollar width="43px" stroke="#000" fill="none"/>}
                description="Além de ser mais barato que outras opções financeiras, com o Consórcio o seu poder de negociação no momento da compra do bem com o vendedor é maior porque o valor do bem é creditado à vista."
            />

            <IconTitleItem title="Reajuste"
              divider={false}
                icon={<Percent width="46px" stroke="#000" fill="none"/>}
                description="As parcelas são reajustadas anualmente pelo INCC. Isso acontece pois os imóveis valorizam e você não perca o poder de compra."
            />

            <IconTitleItem title="FGTS"
              divider={false}
                icon={<Wallet width="46px" fill="none"/>}
                description="Você pode efetuar lances nas assembléias para contemplar rapidamente e utilizar o seu FGTS guardado."
            />
          </SimpleGrid>
        </Stack>

        <WeHelpYou/>
      </Flex>

      <Footer/>
    </Box>
  )
}
