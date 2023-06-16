import { FormControl, SelectProps, Select as ChakraSelect, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { ReactNode, Ref, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormSelectProps extends SelectProps{
    name: string;
    label?: string;
    children: ReactNode;
    variant?: string;
    leftIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    value?: string | number;
    error?: FieldError;
    register?: UseFormRegister<any>;
    onChange?: (value: any) => void;
    selectRef?: Ref<any>

    selected?: number;
}

export function Select({ name, children, variant, selectRef, value = "", label, isRequired, selected, error, register, onChange, ...rest } : FormSelectProps){
    const [controlledValue, setControlledValue] = useState<string | number>("");

    function getRegister(){
        if(register){
            return {
                ...register(name)
            }
        }

        return {
            ref: (selectRef ? selectRef : undefined),
            value: controlledValue,
            onChange: (event: any) => { //React.ChangeEvent<HTMLInputElement>
                    setControlledValue(event.target.value);
                    if(onChange){
                        onChange(event.target.value)
                    }
                }
                
        }
    }

    useEffect(() => {
        setControlledValue(value);
        if(onChange){
            onChange(value);
        }
    }, [value, selected]);

    return(
        <FormControl pos="relative" isInvalid={!!error}>
            {
                label && (
                    <FormLabel zIndex="1" cursor="text" color={variant === "white" ? "white" : "blue.primary"} transition="ease 0.2s" fontWeight="normal" fontSize={"md"} top={controlledValue === "" ? "14px" : "6px"}>{label} {isRequired && '*'}</FormLabel>
                )
            }
            
            <ChakraSelect {...getRegister()} borderRadius="3px" h="50px" fontWeight={controlledValue ? 'semibold' : 'regular'} name={name} fontSize="sm" borderColor={"gray.200"} bgColor={"gray.100"} _hover={ {bgColor: 'gray.500'} } size="lg" color={controlledValue ? "blue.primary" : "gray.700"} {...rest}>
                {children}
            </ChakraSelect>

            { !!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}