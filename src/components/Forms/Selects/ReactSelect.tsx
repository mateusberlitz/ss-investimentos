import { FormControl, FormErrorMessage, FormLabel, Stack, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, FieldError, UseFormRegister } from "react-hook-form";
import Select, {components, OptionProps, PlaceholderProps, ValueContainerProps} from "react-select";
import { customStyles } from "./ReactSelectStyle";
const { ValueContainer, Placeholder } = components;

interface SelectOption{
    value: string,
    label: string,
    description: string,
}

interface ReactSelectProps{
    name: string;
    options: SelectOption[];
    register?: UseFormRegister<any>;
    error?: FieldError;
    control?: any;

    value?: string;
    variant?: string;

    width?: string;
    marginBottom?: string;
    maxWidth?: string
    label?: string;
    placeholder?: string;
}

const CustomPlaceholder = (props: PlaceholderProps) => {
    return (
        <Placeholder {...props} isFocused={props.isFocused}>
            {props.selectProps.placeholder}
        </Placeholder>
    );
};

// const CustomValueContainer = ({ children, ...props }: ValueContainerProps) => {
//     return (
//       <ValueContainer {...props}>
//         <Placeholder {...props} isFocused={props.isFocused}>
//           {props.selectProps.placeholder}
//         </Placeholder>
//         {children}
//       </ValueContainer>
//     );

// const CustomOption = ({...props }: OptionProps) => {
//     return (
//         <Stack pos="relative">
//             {/* <components.Option {...props} /> */}
//             <Text>{props.data.description}</Text>
//         </Stack>
//     );
// };

// interface formatOptionsProps{
//     value: string,
//     label: string,
//     description: string
// }

const formatOption = ({ value, label, description}: SelectOption) => (
    <Stack spacing="1">
        <Text>{label}</Text>
        <Text fontSize={"10px"}>{description}</Text>
    </Stack>
);

export function ReactSelect({name, register, control, value = "", variant = 'outline', label, error, options, width, marginBottom, maxWidth, ...rest} : ReactSelectProps){

    const [controlledValue, setControlledValue] = useState("");

    useEffect(() => {
        setControlledValue(value);
    }, [value]);

    const [focus, setFocus] = useState(false);

    return control ? (
        <FormControl pos="relative" isInvalid={!!error}>
            {
                label && (
                    <FormLabel zIndex="1" cursor="text" color={variant === "white" ? "white" : "blue.primary"} transition="ease 0.2s" fontWeight="normal" fontSize={"md"} top={controlledValue === "" ? "14px" : "6px"}>{label}</FormLabel>
                )
            }
            <Controller
                name={name}
                control={control}
                defaultValue={controlledValue}
                render={({ field: {ref, onChange, value, ...select} }) => 
                    <Select {...select} ref={ref} formatOptionLabel={formatOption} options={options} styles={customStyles} value={options.find(c => c.value === controlledValue)} onChange={val => {onChange(val ? val.value : ""); setControlledValue(val ? val.value : "");}} {...rest}/>
                }
            />
            {/* <Select options={options} styles={customStyles}/> */}

            { !!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    ) : (
        <FormControl pos="relative" isInvalid={!!error}>
            {
                label && (
                    <FormLabel zIndex="1" cursor="text" color={variant === "white" ? "white" : "blue.primary"} transition="ease 0.2s" fontWeight="normal" fontSize={"md"} top={controlledValue === "" ? "14px" : "6px"}>{label}</FormLabel>
                )
            }

            <Select formatOptionLabel={formatOption} options={options} styles={customStyles} onFocus={() => {setFocus(true)}} onMenuClose={() => {setFocus(controlledValue !== "")}} onChange={val => {setControlledValue(val ? val.value : ""); setFocus(val !== undefined)}} {...rest}/>
        
            {/* { !!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>   
            )} */}
        </FormControl>

    );
}