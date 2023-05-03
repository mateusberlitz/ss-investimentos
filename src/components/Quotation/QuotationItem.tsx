import { HStack, Text } from "@chakra-ui/react";

interface QuotationItemProps{
    ticker: string;
    value:string;
    percent?: number;
}

export function QuotationItem({ticker, value, percent}: QuotationItemProps){
    return(
        <HStack px="4" fontWeight="light" minW="185px" justifyContent={"center"}>
            <Text>{ticker}</Text>
            <Text fontWeight={"medium"}>{value}</Text>
            {
                percent && <Text color={percent ? percent < 0 ? "red.400" : "green.400" : "white"} fontWeight="normal">{percent}%</Text>
            }
        </HStack>
    )
}