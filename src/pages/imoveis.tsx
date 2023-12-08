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
import { Container } from '../components/Container'
import { useSimulador } from '@/contexts/SimuladorContext'
import { WeHelpYou } from '@/pageParts/WeHelpYou'

export default function Imoveis(){
  const router = useRouter();

  const simulador = useSimulador();

  return (
    <Box position="relative">

      <Head>
        <title>Imóveis - S&S Investimentos</title>

        <meta name="description" content="Construa ou reforme sua casa, compre seu apartamento ou terreno com as melhores condições."></meta>
      </Head>

      <Flex px="6" flexDir="column" w="100%" bg="url(https://cdn.discordapp.com/attachments/415479229858185218/931207833406550016/casa_grande.jpg)" backgroundSize="cover" backgroundPosition="0 0px">

        <Flex flexDir="column" bg="rgba(0,0,0,0.4)" backdropFilter={"blur(30px)"}>
            <Header fixed={true}/>
        </Flex>

        <Container as="main" pt="36" pb="36" color="white">
          <Stack spacing="10" w="100%" maxW={["100%", "70%","50%"]}>
            <Text>CONSÓRCIO DE IMÓVEIS</Text>

            <Heading fontSize={["5xl","5xl","6xl"]}>Seu plano para adquirir imóveis</Heading>

            <Text>
              Construa ou reforme sua casa, compre seu apartamento ou terreno com as melhores condições.
            </Text>

            <OutlineButton size="lg" borderColor="#444" _hover={{borderColor: '#fff'}} onClick={simulador.handleOpenSimulador}>
              Simular consórcio
            </OutlineButton>
          </Stack>
        </Container>
      </Flex>

      <Flex flexDir="column" w="100%" px="6">
        {/* <Stack w="100%" maxW="1200px" m="0 auto" py="20" spacing="12">
          <HStack justifyContent="space-between">
            <TextTag>OBJETIVOS</TextTag>

            <Link href="/consorcio">
                <ChakraLink href="/consorcio">
                    <Text fontSize="sm">O que é consórcio?</Text>
                </ChakraLink>
            </Link>
          </HStack>

          <Stack spacing={7} direction={["column", "column", "row"]}>
            <TopCard bg="gray.200" title="Reforme" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/reforma.png" href="imoveis"/>

            <TopCard bg="red.100" title="Imóvel novo" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/car.png" href="veiculos"/>

            <TopCard bg="white" title="Imóvel Usado" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>

            <TopCard bg="white" title="Terrenos e Fazendas" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>
          </Stack>

        </Stack> */}

        <Container>
          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <HStack justifyContent="space-between">
              <TextTag>CONDIÇÕES</TextTag>

              <Link href="/consorcio">
                  <ChakraLink href="/consorcio">
                      <Text fontSize="sm">O que é consórcio?</Text>
                  </ChakraLink>
              </Link>
            </HStack>

            <Heading fontSize={["5xl","5xl","6xl"]}>Meia parcela mensal que traz conforto para pagar.</Heading>

            <Text>O consórcio de imóvel é um mecanismo para você alocar dinheiro todo mês para ter a chance de adquirir ou reformar um imóvel mais cedo sendo contemplado.</Text>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/familia.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Container>

        <Container>
          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/woman_dog.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>VANTAGENS</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Investir em renda e ampliar seu patrimônio</Heading>

            <Text>O consórcio é um excelente mecanismo para ampliar seu patrimônio e garantir que seu dinheiro traga retornos como na locação, ou juros com o crédito aplicado.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>
        </Container>

        <Container>
          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>NA PRÁTICA</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Como usar sua carta?</Heading>

            <Text fontWeight="bold">
             <span style={{color: 'blue'}}>-</span> Comprar um imóvel novo, usado ou na planta <span style={{color: 'gray'}}>.</span> <br />
             <span style={{color: 'blue'}}>-</span> Pagar materiais, mão de obra ou outro financiamento <span style={{color: 'gray'}}>.</span> <br />
            </Text>

            <Text>Sempre que contemplado, para poder utilizar o crédito, o sorteado deve passar pelo <b>processo de liberação</b>, no qual depende do tipo do imóvel desejado. No processo, é feita a análise de crédito e garantias</Text>
          
            <MainButton size="lg" onClick={simulador.handleOpenSimulador}>
              Simular
            </MainButton>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/casal_comprando.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Container>

        <Container>
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
                  <Td bg="gray.200">R$200.000,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Taxa de adm.(22%)</Td>
                  <Td bg="gray.200">R$44.000,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Fundo reserva.(1%)</Td>
                  <Td bg="gray.200">R$2.000,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Juros (0%)</Td>
                  <Td bg="gray.200">R$0,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontWeight="bold">Total</Td>
                  <Td bg="gray.200" fontWeight="bold">R$246.000,00</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Prazo: 180 meses</Th>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Meia parcela: R$683,00</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Stack>

          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>EXEMPLO</TextTag>

            <Heading fontSize="5xl">O que compõe a parcela?</Heading>

            <Text fontSize="lg">A <b>meia parcela</b> é um recurso exclusivo da administradora <b>HS consórcios</b>, no qual você paga este valor reduzido até ser <b>contemplado</b>, e então depois passa a pagar a parcela integralmente mas já com o bem em mãos.</Text>
          </Stack>
        </Container>

        <Container direction="column" spacing="12" py="20">
          <TextTag>CARACTERÍSTICAS</TextTag>

          <SimpleGrid columns={3} spacing={6}>
            <IconTitleItem title="Poder de negociação"
              divider={false}
                icon={<Dollar width="43px" stroke="#000" fill="none"/>}
                description="Além do consórcio ser mais barato que outras opções financeiras, este garante seu poder de negociação no momento da compra do bem junto ao vendedor, pois o valor do bem é creditado à vista."
            />

            <IconTitleItem title="Reajuste"
              divider={false}
                icon={<Percent width="46px" stroke="#000" fill="none"/>}
                description="As parcelas são reajustadas anualmente pelo INCC. Isso acontece pois os imóveis valorizam e você não perde o poder de compra."
            />

            <IconTitleItem title="FGTS"
              divider={false}
                icon={<Wallet width="46px" fill="none"/>}
                description="Você pode efetuar lances nas assembléias para contemplar rapidamente e utilizar o seu FGTS guardado."
            />
          </SimpleGrid>
        </Container>

        <WeHelpYou/>
      </Flex>

      <Footer/>
    </Box>
  )
}
