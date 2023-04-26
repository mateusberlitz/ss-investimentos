import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, Table, Thead, Tbody, Td, Th, Tr, Tfoot, Checkbox, Accordion, AccordionItem, AccordionButton, Box, AccordionPanel, AccordionIcon, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Quota } from "../../pages/contempladas";
import { Board } from "../Board";
import { MainButton } from "../Buttons/MainButton";
import { TextTag } from "../TextTag";

interface SumModalProps{
    isOpen: boolean;
    handleCloseSumModal: () => void;
    selectedQuotas: Quota[];
}

interface Amount{
    credit: number;
    entry: number;
    deadline: number;
    parcel: number;
    debt: number;
    tax: number;
    fund: number;
}

export default function Sum({isOpen, handleCloseSumModal, selectedQuotas} : SumModalProps){
    const router = useRouter();

    const [sendCards, setSendCards] = useState(false);
    const [sendEntry, setSendEntry] = useState(false);
    const [sendDebt, setSendDebt] = useState(false);
    const [sendTax, setSendTax] = useState(false);
    const [sendFund, setSendFund] = useState(false);

    const [amount, setAmount] = useState<Amount>({
        credit: 0,
        entry: 0,
        deadline: 0,
        parcel: 0,
        debt: 0,
        tax: 0,
        fund: 0
    });

    const handleSend = () => {
        const entryText = sendEntry ? `\nEntrada: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.entry)}` : ``;
        const debtText = sendDebt ? `\nSaldo Devedor: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.debt)}` : ``;
        const fundText = sendFund ? `\nFundo Comum: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.fund)}` : ``;
        const taxText = sendTax ? `\nTaxa de transferência: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.tax)}` : ``;

        const cardsText = sendCards ? selectedQuotas.reduce((accumulator, quota) => {
            return `${accumulator}\nCarta ${quota.id} - ${quota.categoria}: R$ ${quota.valor_credito} (${quota.parcelas}x R$${quota.valor_parcela})`
        }, `\nCartas selecionadas:\n`) : ``;

        const text = `Resultado da Soma das Cartas Contempladas

Crédito: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.credit)} ${entryText}
Prazo: ${amount.deadline}x
Parcela: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.parcel)} ${fundText} ${taxText} ${debtText}
        ${cardsText}`;

        window.open(`https://api.whatsapp.com/send?text=${window.encodeURIComponent(text)}`);
    }

    useEffect(() => {
        const newAmount = selectedQuotas.reduce((accumulator, quota) => {
            console.log(quota.fundo, parseFloat(quota.fundo.toString().replace('.', ',')));
            return {
                credit: accumulator.credit + parseFloat(quota.valor_credito.replace(".", "").replace(",", ".")),
                entry: accumulator.entry + parseFloat(quota.entrada.replace(".", "").replace(",", ".")),
                deadline: accumulator.deadline + parseInt(quota.parcelas),
                parcel: accumulator.parcel + parseFloat(quota.valor_parcela.replace(".", "").replace(",", ".")),
                debt: accumulator.debt + parseFloat(quota.valor_parcela.replace(".", "").replace(",", "."))*parseInt(quota.parcelas),
                tax: accumulator.tax + (quota.taxa ? parseFloat(quota.taxa.toString().replace('.', '').replace(',', '.')) : 0),
                fund: accumulator.fund + (quota.fundo ? parseFloat(quota.fundo.toString().replace('.', '').replace(',', '.')) : 0),
            }
        }, {
            credit: 0,
            entry: 0,
            deadline: 0,
            parcel: 0,
            debt: 0,
            tax: 0,
            fund: 0
        });

        newAmount.deadline = Math.round(newAmount.debt / newAmount.parcel);

        setAmount(newAmount);
    }, [selectedQuotas]);

    return(
        <>
          <Modal isOpen={isOpen} onClose={handleCloseSumModal}>
            <ModalOverlay w="100%"/>
  
            <ModalContent w="100%">
              {/* <ModalHeader>Modal Title</ModalHeader> */}
  
              <ModalCloseButton />
  
              <ModalBody bg="">
                <Stack w="100%" maxW="360px" m="0 auto" py="10" spacing="14">
                    <Stack spacing="9">
                        <Stack spacing="6">
                            <TextTag>SOMA DE CONTEMPLADAS</TextTag>
  
                            <Heading fontSize="3xl">Veja o resultado da soma</Heading>
                        </Stack>
  
                        <Table borderRadius="4px" overflow="hidden" style={{borderCollapse:"separate", borderSpacing:"0 0.7em"}}>
                            <Thead>
                                {/* <Tr>
                                    <Th bg="red.100" fontFamily="Inter" fontSize="sm" py="16px" color="black"></Th>
                                    <Th bg="red.100" fontFamily="Inter" fontSize="sm" py="16px" color="black"></Th>
                                </Tr> */}
                            </Thead>
                            <Tbody fontSize="sm">
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Crédito</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.credit)}</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Entrada</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.entry)}</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Prazo</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{amount.deadline}x</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Parcela</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.parcel)}</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Fundo comum</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.fund)}</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)">Taxa de Transferência</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.tax)}</Td>
                                </Tr>
                                <Tr>
                                    <Td bg="rgba(67, 67, 67, 0.05)" fontWeight="bold">Saldo Devedor</Td>
                                    <Td bg="rgba(67, 67, 67, 0.05)" fontWeight="bold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(amount.debt)}</Td>
                                </Tr>
                            </Tbody>
                            {/* <Tfoot>
                                <Tr>
                                <Th bg="black" color="white" fontFamily="Inter" textTransform="capitalize" fontSize="sm" py="16px">Prazo: 180 meses</Th>
                                <Th bg="black" color="white" fontFamily="Inter" textTransform="capitalize" fontSize="sm" py="16px">Meia parcela: R$683,00</Th>
                                </Tr>
                            </Tfoot> */}
                        </Table>

                        <Accordion w="100%" allowToggle>
                            <AccordionItem w="100%">
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Cartas Selecionadas
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <>
                                        <Table size='sm' borderRadius="4px" overflow="hidden" maxW="100%">
                                            <Tbody>
                                                {
                                                    selectedQuotas.map((quota) => {
                                                        return(
                                                            <Tr key={quota.id} fontSize={"14px"}>
                                                                <Td px="0">
                                                                    <Stack spacing="0">
                                                                        <Text fontSize="11px" color="gray.700">{quota.id}</Text>
                                                                        <Text color="gray.900" fontWeight="bold">{quota.categoria}</Text>
                                                                    </Stack>
                                                                </Td>
                                                                {/* <Td>{quota.categoria}</Td> */}
                                                                {/* <Td>{quota.valor_credito}</Td>
                                                                <Td>{quota.parcelas}x</Td> */}
                                                                <Td textAlign={"right"} px="0">
                                                                    <Stack spacing="0">
                                                                        <Text fontWeight="bold">{quota.valor_credito}</Text>
                                                                        <Text fontSize="11px" fontWeight="">{quota.parcelas}x {quota.valor_parcela}</Text>
                                                                    </Stack>
                                                                </Td>
                                                            </Tr>
                                                        )
                                                    })
                                                }
                                            </Tbody>
                                            {/* <Tfoot>
                                                <Tr>
                                                <Th bg="black" color="white" fontFamily="Inter" textTransform="capitalize" fontSize="sm" py="16px">Prazo: 180 meses</Th>
                                                <Th bg="black" color="white" fontFamily="Inter" textTransform="capitalize" fontSize="sm" py="16px">Meia parcela: R$683,00</Th>
                                                </Tr>
                                            </Tfoot> */}
                                        </Table>

                                        {
                                            selectedQuotas.map((quota) => {
                                                //return(
                                                    <HStack key={quota.id} fontSize={"14px"} w="100%" justifyContent="space-between">
                                                        <Stack spacing="0">
                                                            <Text fontSize="11px" color="gray.700">{quota.id}</Text>
                                                            <Text color="gray.900">{quota.categoria}</Text>
                                                        </Stack>
                                                        <Stack spacing="0">
                                                            <Text fontWeight="bold">{quota.valor_credito}</Text>
                                                            <Text fontSize="11px" fontWeight="">{quota.parcelas}x {quota.valor_parcela}</Text>
                                                        </Stack>
                                                    </HStack>
                                                //)
                                            })
                                        }

                                    </>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <Board boxShadow="none" border="1px solid" borderColor="gray.200" padding="5" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                            <Stack spacing="6">
                                <TextTag fontSize="11" fontWeight="semibold">COMPARTILHE</TextTag>

                                <Stack>
                                    <Checkbox borderColor="gray.600" onChange={(event: ChangeEvent<HTMLInputElement>) => setSendCards(event.target?.checked)}><Text>Cartas selecionadas</Text></Checkbox>
                                    <Checkbox borderColor="gray.600" onChange={(event: ChangeEvent<HTMLInputElement>) => setSendDebt(event.target?.checked)}><Text>Saldo devedor</Text></Checkbox>
                                    <Checkbox borderColor="gray.600" onChange={(event: ChangeEvent<HTMLInputElement>) => setSendEntry(event.target?.checked)}><Text>Entrada</Text></Checkbox>
                                    <Checkbox borderColor="gray.600" onChange={(event: ChangeEvent<HTMLInputElement>) => setSendTax(event.target?.checked)}><Text>Taxa de transferência</Text></Checkbox>
                                    <Checkbox borderColor="gray.600" onChange={(event: ChangeEvent<HTMLInputElement>) => setSendFund(event.target?.checked)}><Text>Fundo comum</Text></Checkbox>
                                </Stack>

                                <MainButton size="lg" onClick={() => handleSend()}>
                                    Compartilhar
                                </MainButton>
                            </Stack>
                        </Board>
                    </Stack>
                </Stack>
              </ModalBody>
  
              {/* <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
        </>
    )
}