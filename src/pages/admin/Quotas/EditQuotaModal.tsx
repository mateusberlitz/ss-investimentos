import { MainButton } from "@/components/Buttons/MainButton";
import { SolidButton } from "@/components/Buttons/SolidButton";
import { ControlledInput } from "@/components/Forms/Inputs/ControlledInput";
import { Input } from "@/components/Forms/Inputs/Input";
import { ControlledSelect } from "@/components/Forms/Selects/ControlledSelect";
import { ReactSelect } from "@/components/Forms/Selects/ReactSelect";
import { Select } from "@/components/Forms/Selects/Select";
import { useErrors } from "@/hooks/useErrors";
import { serverApi } from "@/services/api";
import moneyToBackend from "@/utils/moneyToBackend";
import { Checkbox, Heading, HStack, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import * as yup from 'yup';

interface NewQuotaModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    afterEdit: () => void;
    toEditQuotaData: EditQuota;
}

export interface EditQuota{
    id: number;
    sold: boolean;
    segment: string;
    admin: string;
    value?: string;
    credit: string;
    parcel: string;
    common_fund?: string;
    deadline: number;
    group: string;
    quota: string;
    cost: string;
    partner_cost?: string;
    partner_id?: number;
    passed_cost?: string;
    total_cost?: string;
    seller?: string;
    cpf_cnpj?: string;
    paid_percent?: string;
    partner_percent?: string;
    is_contemplated?: boolean;
    is_hot?: boolean;
    tax?: string;
    reserved: boolean;
    contemplated_type: string;
    month_adjust_number?: number;
    adjust_index?: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}

const EditQuotaFormSchema = yup.object().shape({
    segment: yup.string().required('Selecione o tipo da carta de crédito'),
    description: yup.string().nullable(),
    admin: yup.string().required('Informe o nome da administradora'),
    seller: yup.string().nullable(),//.required("De quem foi comprada a carta?"),
    contemplated_type: yup.string().nullable(),//.required("Qual o tipo de contemplação?"),
    is_contemplated: yup.boolean().required("É contemplado?"),
    is_hot: yup.boolean().nullable(),
    credit: yup.string().required("Informe o valor do crédito"),
    deadline: yup.string().required("Informe o prazo"),
    parcel: yup.string().required("Informe a parcela"),
    value: yup.string().required('Informe o valor da entrada'),
    cost: yup.string().nullable(),//.required("Informe o custo"),
    total_cost: yup.string().nullable(),//.required("Informe o custo total"),
    cpf_cnpj: yup.string().nullable(),//.required("Qual o cpf ou cnpj proprietário?"),
    partner_id: yup.string().nullable(),
    partner_cost: yup.string().nullable(),
    passed_cost: yup.string().nullable(),
    paid_percent: yup.string().nullable(),//.required("Diga qual o percentual pago"),
    partner_percent: yup.string().nullable(),
    purchase_date: yup.string().nullable(),//.required("Selecione a data de compra"),
    group: yup.string().required("Informe o grupo"),
    quota: yup.string().required("Informe a cota"),
    tax: yup.string().nullable(),
    month_adjust_number: yup.number().transform((v, o) => o === '' ? null : v).nullable(),
    adjust_index: yup.string().nullable(),
});

export function EditQuotaModal({ isOpen, onRequestClose, afterEdit, toEditQuotaData } : NewQuotaModalProps){
    const toast = useToast();
    const { showErrors } = useErrors();
    const router = useRouter();

    const { register, handleSubmit, control, watch, reset, formState, setValue} = useForm<EditQuota>({
        resolver: yupResolver(EditQuotaFormSchema),
    });

    const [sold, setSold] = useState(toEditQuotaData.sold);
    const [reserved, setReserved] = useState(toEditQuotaData.reserved);

    //const watchCost = watch('cost');

    const watchCost = useWatch({
        control,
        name: 'cost',
    });

    const watchCredit = useWatch({
        control,
        name: 'credit',
    });

    const watchPaidPercent = useWatch({
        control,
        name: 'paid_percent',
    });

    const watchPartnerCost = useWatch({
        control,
        name: 'partner_cost',
    });

    const watchTotalCost = useWatch({
        control,
        name: 'total_cost',
    });

    const [paidPercent, setPaidPercent] = useState<number>();
    const [partnerPercent, setPartnerPercent] = useState<number>();
    const [totalCost, setTotalCost] = useState<string>();

    useEffect(() => {
        if(watchCost && watchCredit){
            const selectedCost = parseFloat(moneyToBackend(watchCost));
            const selectedCredit = parseFloat(moneyToBackend(watchCredit));

            const paidParcent = (selectedCost * 100) / selectedCredit;

            setPaidPercent(paidParcent);
            //setValue('paid_percent', paidParcent.toString(), { shouldValidate: true });
        }
    }, [watchCost, watchCredit]);

    useEffect(() => {
        const partnerCost = watch('partner_cost') === "" ? "0" : watch('partner_cost');

        if(watch('cost') && moneyToBackend(watch('cost')) || (partnerCost && moneyToBackend(partnerCost))){
            const partnerCost = watch('partner_cost') === "" ? "0" : watch('partner_cost');
            const cost = watch('cost') === "" ? "0" : watch('cost');
            const credit = watch('credit') === "" ? "0" : watch('credit');
            
            if(partnerCost !== undefined){
                const selectedCost = parseFloat(moneyToBackend(cost));
                const selectedPartnerCost = parseFloat(moneyToBackend(partnerCost));
                const selectedCredit = parseFloat(moneyToBackend(credit));

                const totalCost = (selectedCost + selectedPartnerCost).toFixed(2);
                const newPaidPercent = ((selectedCost + selectedPartnerCost)*100)/selectedCredit;
                //setValue('total_cost', totalCost.toString(), { shouldValidate: true });
                console.log(totalCost.toString());
                setTotalCost(totalCost.toString());
                setPaidPercent(newPaidPercent);
                setPartnerPercent(selectedPartnerCost === 0 ? 0 : (parseFloat(totalCost) === selectedPartnerCost ? 100 : (selectedPartnerCost * 100)/parseFloat(totalCost)));

                return;
            }


            setTotalCost(watch('cost'));
            //setValue('total_cost', watchCost, { shouldValidate: true });
        }
    }, [watch('cost'), watch('partner_cost')]);
    

    function includeAndFormatData(quotaData: EditQuota): EditQuota{
        quotaData.value = ((quotaData.value != null && quotaData.value != "") ? moneyToBackend(quotaData.value) : '');
        quotaData.credit = moneyToBackend(quotaData.credit);

        quotaData.sold = sold;
        quotaData.reserved = reserved;

        quotaData.partner_cost = ((quotaData.partner_cost != null && quotaData.partner_cost != "") ? moneyToBackend(quotaData.partner_cost) : '');
        quotaData.passed_cost = ((quotaData.passed_cost != null && quotaData.passed_cost != "") ? moneyToBackend(quotaData.passed_cost) : '');

        quotaData.total_cost = ((quotaData.total_cost != null && quotaData.total_cost != "") ? moneyToBackend(quotaData.total_cost) : '');
        quotaData.parcel = ((quotaData.parcel != null && quotaData.parcel != "") ? moneyToBackend(quotaData.parcel) : '');
        quotaData.common_fund = ((quotaData.common_fund != null && quotaData.common_fund != "") ? moneyToBackend(quotaData.common_fund) : '');
        quotaData.tax = ((quotaData.tax != null && quotaData.tax != "") ? moneyToBackend(quotaData.tax) : '');

        //quotaData.purchase_date = formatInputDate(quotaData.purchase_date);
        console.log(quotaData);

        return quotaData;
    }

    const handleEditQuota = async (quotaData : EditQuota) => {
        try{
            console.log(quotaData);
            quotaData = includeAndFormatData(quotaData);
            console.log(quotaData);

            const response = await serverApi.post(`/ready_quotas/update/${toEditQuotaData.id}`, quotaData).catch((error: AxiosError) => {
                if(error.code === "401"){
                    router.push('/');
                }
            });

            toast({
                title: "Sucesso",
                description: `A Cota ${quotaData.group}-${quotaData.quota} foi atualizada.`,
                status: "success",
                duration: 12000,
                isClosable: true,
            });

            onRequestClose();
            afterEdit();
            reset();
        }catch(error:any) {
            console.log(error);
            showErrors(error, toast);
        }
    }

    useEffect(() => {
        setSold(toEditQuotaData.sold);
        setReserved(toEditQuotaData.reserved);
    }, [toEditQuotaData])

    return(
        <Modal isOpen={isOpen} onClose={onRequestClose} size="xl">
            <ModalOverlay />
            <ModalContent as="form" borderRadius="24px" onSubmit={handleSubmit(handleEditQuota)}>
                <ModalHeader p="10" >
                    <Heading fontWeight="700" fontSize="2xl">Alterar cota {toEditQuotaData.group}-{toEditQuotaData.quota}</Heading>
                    <Text fontWeight={"normal"} fontSize="md" mt="3">Campos com * são obrigatórios</Text>
                </ModalHeader>

                <ModalCloseButton top="10" right="5"/>
                
                <ModalBody pl="10" pr="10">
                    <Stack spacing="6">
                        <HStack spacing="4">
                            <Checkbox isChecked={sold} value={toEditQuotaData.id} name="sold" onChange={(event: ChangeEvent<HTMLInputElement>) => {setSold(event.target?.checked)}}>Vendida</Checkbox>
                            <Checkbox isChecked={reserved} value={toEditQuotaData.id} name="reserved" onChange={(event: ChangeEvent<HTMLInputElement>) => {setReserved(event.target?.checked)}}>Reservada</Checkbox>
                        </HStack>

                        <HStack spacing="4" align="baseline">
                            <ControlledSelect control={control} value={toEditQuotaData.is_contemplated ? 1 : 0} isRequired h="45px" name="is_contemplated" label="Situação" w="100%" fontSize="sm" focusBorderColor="blue.800" bg="gray.400" variant="outline" _hover={ {bgColor: 'gray.500'} } size="lg" error={formState.errors.is_contemplated}>
                                <option value={1}>Contemplada</option>
                                <option value={0}>Não contemplada</option>
                            </ControlledSelect>

                            <ControlledSelect control={control} value={toEditQuotaData.segment} isRequired h="45px" name="segment" label="Segmento" w="100%" fontSize="sm" focusBorderColor="blue.800" bg="gray.400" variant="outline" _hover={ {bgColor: 'gray.500'} } size="lg" error={formState.errors.segment}>
                                <option value="Imóvel" selected>Imóvel</option>
                                <option value="Veículo">Veículo</option>
                            </ControlledSelect>
                        </HStack>

                        <HStack spacing="4" align="baseline">
                            <ControlledInput control={control} value={toEditQuotaData.credit} isRequired name="credit" label="Crédito" type="text" placeholder="Crédito" variant="outline" mask="money" error={formState.errors.credit} focusBorderColor="blue.800"/>
                            <ControlledInput control={control} value={toEditQuotaData.value} name="value" type="text" label="Entrada" placeholder="Entrada" variant="outline" mask="money" error={formState.errors.value} focusBorderColor="blue.800"/>
                        </HStack>

                        <HStack spacing="4" align="baseline">
                            <ControlledInput isRequired control={control} value={toEditQuotaData.deadline.toString()} name="deadline" type="text" placeholder="Prazo" label="Prazo" variant="outline" error={formState.errors.deadline} focusBorderColor="blue.800"/>

                            <ControlledInput isRequired control={control} value={toEditQuotaData.parcel} name="parcel" type="text" placeholder="Parcela" label="Parcela" variant="outline" mask="money" error={formState.errors.parcel} focusBorderColor="blue.800"/>
                        </HStack>

                        {/* <HStack spacing="4" align="baseline">
                            <Input register={register} name="value" type="text" placeholder="Entrada" variant="outline" mask="money" error={formState.errors.value} focusBorderColor="blue.800"/>
                        
                            <Input register={register} name="common_fund" type="text" placeholder="Fundo comum" variant="outline" mask="money" error={formState.errors.common_fund} focusBorderColor="blue.800"/>
                            
                        </HStack> */}

                        {/* <Input register={register} name="total_cost" type="text" placeholder="Custo Total" variant="outline" mask="money" error={formState.errors.total_cost} focusBorderColor="blue.800"/> */}

                        <HStack spacing="4" align="baseline">
                            <ControlledInput isRequired control={control} value={toEditQuotaData.group} name="group" type="text" placeholder="Grupo" label="Grupo" variant="outline" error={formState.errors.group} focusBorderColor="blue.800"/>

                            <ControlledInput isRequired control={control} value={toEditQuotaData.quota} name="quota" type="text" placeholder="Cota" label="Cota" variant="outline" error={formState.errors.quota} focusBorderColor="blue.800"/>
                        </HStack>

                        <HStack spacing="4" align="baseline">
                            <ControlledInput isRequired control={control} value={toEditQuotaData.admin} name="admin" type="text" placeholder="HS" label="Administradora" variant="outline" error={formState.errors.admin} focusBorderColor="blue.800"/>
                        </HStack>

                        {/* <HStack spacing="4" align="baseline">
                            <Input register={register} name="seller" type="text" placeholder="Comprado de" label="Comprado de" variant="outline" error={formState.errors.seller} focusBorderColor="blue.800"/>
                            <Input register={register} name="cpf_cnpj" type="text" placeholder="CPF/CNPJ" label="CPF/CNPJ" variant="outline" error={formState.errors.cpf_cnpj} focusBorderColor="blue.800"/>
                        </HStack>

                        <HStack spacing="4" align="baseline">
                        <Input register={register} name="purchase_date" type="date" placeholder="Data de Compra" variant="outline" label="Data da compra" error={formState.errors.purchase_date} focusBorderColor="blue.800"/>
                            <Input register={register} name="tax" type="text" placeholder="Taxa" mask="money" label="Taxa" variant="outline" error={formState.errors.tax} focusBorderColor="blue.800"/>
                        </HStack> */}

                        <ControlledInput control={control} value={toEditQuotaData.description} name="description" type="text" placeholder="Descrição" label="Descrição" variant="outline" error={formState.errors.description} focusBorderColor="blue.800"/>

                    </Stack>
                </ModalBody>

                <ModalFooter p="10">
                    <MainButton mr="6" type="submit" isLoading={formState.isSubmitting}>
                        Atualizar
                    </MainButton>

                    <Link onClick={onRequestClose} color="gray.700" fontSize="14px">Cancelar</Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}