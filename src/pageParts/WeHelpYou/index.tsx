import { MainButton } from "@/components/Buttons/MainButton";
import { useSimulador } from "@/contexts/SimuladorContext";
import { Heading, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { OutlineButton } from "../../components/Buttons/OutlineButton"
import { SolidButton } from "../../components/Buttons/SolidButton"
import { Container } from "../../components/Container"

export function WeHelpYou() {
  const router = useRouter();

  const simulador = useSimulador();

  return (
    <Stack direction="column" spacing="20" w="100%" maxW="800px" m="0 auto" py="20" textAlign="center" alignItems="center">
      <Heading fontSize={["5xl", "5xl", "6xl"]}>Ajudamos você a conquistar seus objetivos</Heading>

      <Stack direction={["column", "column", "row"]} spacing="12" alignItems="center">

        <Stack spacing="4" textAlign="center" alignItems="center">
          <Text fontSize="sm">Simule gratuitamente</Text>

          <MainButton  w="230px" size="lg" onClick={simulador.handleOpenSimulador}>
            Simular consórcio
          </MainButton>
        </Stack>

      </Stack>
    </Stack>
  )
}
