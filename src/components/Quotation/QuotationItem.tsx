import { HStack, Text } from "@chakra-ui/react";

interface QuotationItemProps{
    ticker: string;
    value?:string;
    percent: number;
}

export function QuotationItem({ticker, value, percent}: QuotationItemProps){
    return(
        <HStack px="4" fontSize={"sm"} fontWeight="light" minW="185px">
            <Text>{ticker}</Text>
            <Text>{value}</Text>
            <Text color={percent < 0 ? "red.400" : "green.400"} fontWeight="normal">{percent}%</Text>
        </HStack>
    )
}