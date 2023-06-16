import { showErrors } from "@/hooks/useErrors";
import { CreateNewQuota } from "@/pageParts/Quotas/NewQuotaModal";
import { serverApi } from "@/services/api";
import moneyToBackend from "@/utils/moneyToBackend";
import { Toast, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export interface Quota{
    id: number;
    sold: boolean;
    segment: string;
    admin: string;
    value: number;
    credit: number;
    deadline: number;
    parcel: number;
    group: string;
    quota: string;
    cost?: number;
    partner_cost?: number;
    passed_cost?: number;
    total_cost?: number;
    seller?: string;
    cpf_cnpj?: string;
    paid_percent?: string;
    partner_percent?: number;
    tax?: number;
    common_fund?: number;
    contemplated_type?: string;
    is_contemplated: boolean;
    is_hot: boolean;
    reserved: boolean;
    month_adjust_number?: number;
    adjust_index?: string;
    description?: string;
    purchase_date?: string;
    created_at: string;
    updated_at: string;
}

export function useQuotas(){
    const [quotas, setQuotas] = useState<Quota[]>();
    const toast = useToast();
    
    const [token, setToken] = useState<string>(() => {
        const { 'ss.token' : token } = parseCookies();
        return token;
    });

    const router = useRouter();
    
    const loadQuotas = async () => {
        if(token){
            await serverApi.get('/ready_quotas')
            .then((response) => {
                setQuotas(response.data)
            }).catch((error: AxiosError) => {
                if(error.code === "401"){
                    router.push('/');
                }
            })
        }
    }

    function includeAndFormatData(quotaData: CreateNewQuota): CreateNewQuota{
        quotaData.value = ((quotaData.value != null && quotaData.value != "") ? moneyToBackend(quotaData.value) : '');
        quotaData.credit = moneyToBackend(quotaData.credit);
        quotaData.cost = moneyToBackend(quotaData.cost);

        quotaData.partner_cost = ((quotaData.partner_cost != null && quotaData.partner_cost != "") ? moneyToBackend(quotaData.partner_cost) : '');
        quotaData.passed_cost = ((quotaData.passed_cost != null && quotaData.passed_cost != "") ? moneyToBackend(quotaData.passed_cost) : '');

        quotaData.total_cost = ((quotaData.total_cost != null && quotaData.total_cost != "") ? moneyToBackend(quotaData.total_cost) : '');
        quotaData.parcel = ((quotaData.parcel != null && quotaData.parcel != "") ? moneyToBackend(quotaData.parcel) : '');
        quotaData.common_fund = ((quotaData.common_fund != null && quotaData.common_fund != "") ? moneyToBackend(quotaData.common_fund) : '');
        quotaData.tax = ((quotaData.tax != null && quotaData.tax != "") ? moneyToBackend(quotaData.tax) : '');

        return quotaData;
    } 

    const insertQuota = async (quotaData : CreateNewQuota) => {
        try{
            quotaData = includeAndFormatData(quotaData);

            console.log(quotaData);

            const response = await serverApi.post('/ready_quotas/store', quotaData);

            Toast({
                title: "Sucesso",
                description: `A Cota ${quotaData.group}-${quotaData.quota} foi cadastrada.`,
                status: "success",
                duration: 12000,
                isClosable: true,
            });
        }catch(error:any) {
            showErrors(error, toast);
        }
    }

    useEffect(() => {
        loadQuotas();
    }, []);

    return {quotas, loadQuotas, insertQuota};
}
