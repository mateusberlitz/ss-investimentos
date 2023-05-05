import { Box, Divider, HStack } from "@chakra-ui/react";
import { QuotationItem } from "./QuotationItem";

import styles from './Quotation.module.css'
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { brapi } from "@/services/brapi";
import gsap from "gsap";

interface Stock{
    stock: string,
    name: string,
    close: number,
    change: number,
    volume: number,
    market_cap: number,
    logo: string,
    sector: string
}

interface BacenData{
    data: string;
    valor: string;
}

interface Quote{
    value: number;
    variation?: number;
}

interface Quotations{
    selic: Quote;
    ipca: Quote;
    dolar: Quote;
    euro: Quote;
    bitcoin: Quote;
    ibov: Quote;
    cdi: Quote;
    igpm: Quote;
    incc: Quote;
}

export function Quotation(){
    const [selic, setSelic] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [ipca, setIpca] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [dolar, setDolar] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [euro, setEuro] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [bitcoin, setBitcoin] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [ibov, setIbov] = useState<Quote>({
        value: 0,
    });
    const [cdi, setCdi] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [igpm, setIgpm] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [incc, setIncc] = useState<Quote>({
        value: 0,
        variation: 0
    });

    const today = new Date();
    //const startDate = new Date();

    const finalDate = new Date(today.getFullYear(), today.getMonth(), 0);
    const startDate = new Date(today.getFullYear(), today.getMonth() -13, 0);
    const previousMonthStart = new Date(today.getFullYear(), today.getMonth() -1, 1);
    const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    
    const fetchSelic = () => {
        brapi.get('v2/prime-rate?country=brazil').then(response => setSelic({value: response.data["prime-rate"][0].value}));
    }

    const fetchIbov = () => {
        axios.get('https://api-python-finance.herokuapp.com').then(response => {
            console.log(response);
            const newIbovAmount = parseFloat(response.data[0].Close);
            const newIbovPrevious = parseFloat(response.data[0].Open);

            const percent = 100 - ((newIbovPrevious * 100) / newIbovAmount);

            setIbov({value: newIbovAmount, variation: percent});
        });
    }

    const fetchIpca = async () => {
        const ipcaValue = await brapi.get('v2/inflation').then(response => {
            //setIpca({value: response.data.inflation[0].value})
            return response.data.inflation[0].value;
        });

        const previousValue = await brapi.get(`v2/inflation?country=brazil&historical=true&start=${previousMonthStart.toLocaleDateString().split(',')[0]}&end=${previousMonthEnd.toLocaleDateString().split(',')[0]}`).then(response => {
            //setIpca({value: response.data.inflation[0].value})
            return response.data.inflation[0].value;
        });

        const ipcaVariation = previousValue > ipcaValue ? previousValue - ipcaValue : ipcaValue - previousValue

        setIpca({value: ipcaValue, variation: ipcaVariation});
    }

    const fetchBitcoin = () => {
        brapi.get('v2/crypto?coin=BTC&currency=BRL').then(response => {
            setBitcoin({value: response.data.coins[0].regularMarketPrice})
        });
    }

    const fetchDolar = () => {
        brapi.get('v2/currency?currency=USD-BRL').then(response => {
            setDolar({value: parseFloat(response.data["currency"][0].bidPrice), variation: parseFloat(response.data["currency"][0].bidVariation)})
        });
    }

    const fetchEuro = () => {
        brapi.get('v2/currency?currency=EUR-BRL').then(response => {
            setEuro({value: parseFloat(response.data["currency"][0].bidPrice), variation: parseFloat(response.data["currency"][0].bidVariation)})
        });
    }

    const fetchCdi = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newCdi = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setCdi({value: newCdi, variation: response.data[response.data.length]});
        });
    }

    const fetchIncc = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.192/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newIncc = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setIncc({value: newIncc});
        });
    }

    const fetchIgpm = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newIgpm = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setIgpm({value: newIgpm});
        });
    }
    
    useEffect(() => {
        fetchSelic();
        fetchIbov();
        fetchIpca();
        fetchBitcoin();
        fetchDolar();
        fetchCdi();
        fetchIgpm();
        fetchIncc();
        fetchEuro();

        const ctx = gsap.context(() => {
            const quotationTimeline = gsap.timeline({
                //paused:true,
                immediateRender: false,
                delay: 7,
                repeat: -1,
                repeatDelay: 0
            });

            quotationTimeline.to("#quotation", { 
                    x: "-50%",
                    duration: 25.0,
                    ease: "none"
                }
            ).to("#quotation", { 
                    x: "7%",
                    duration: 0,
                    ease: "none"
                }
            );
        });
    }, []);



    return(
        <HStack w="100%" overflow={"hidden"}>
            <HStack w="fit-content" h="35px" bg="blue.primary" color="gray.200" id="quotation" fontSize={"sm"}>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={Intl.NumberFormat('pt-BR', {}).format(ibov.value)} percent={ibov.variation}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IPCA" value={ipca.value.toLocaleString()} percent={ipca.variation}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="SELIC" value={selic.value.toLocaleString()} percent={undefined}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="CDI" value={cdi.value.toLocaleString()} />
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="Dolar" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(dolar.value)} percent={dolar.variation}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="Euro" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(euro.value)} percent={euro.variation}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="INCC" value={incc.value.toLocaleString()} />
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IGPM" value={igpm.value.toLocaleString()}/>

                <HStack w="fit-content" h="35px" bg="blue.primary" color="gray.200" fontSize={"sm"}>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="IBOV" value={Intl.NumberFormat('pt-BR', {}).format(ibov.value)} percent={ibov.variation}/>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="IPCA" value={ipca.value.toLocaleString()} percent={ipca.variation}/>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="SELIC" value={selic.value.toLocaleString()} percent={undefined}/>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="CDI" value={cdi.value.toLocaleString()} />
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="Dolar" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(dolar.value)} percent={dolar.variation}/>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="Euro" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(euro.value)} percent={euro.variation}/>
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="INCC" value={incc.value.toLocaleString()} />
                    <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                    <QuotationItem ticker="IGPM" value={igpm.value.toLocaleString()}/>
                </HStack>
            </HStack>
        </HStack>
    )
}