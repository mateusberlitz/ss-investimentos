import { FormControl, FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, FieldError, UseFormRegister } from "react-hook-form";
import Select, {components, PlaceholderProps, ValueContainerProps} from "react-select";
import { customStyles } from "./ReactSelectStyle";
const { ValueContainer, Placeholder } = components;

interface SelectOption{
    value: string,
    label: string,
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
//   };

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
                    <Text fontSize="sm" mb="1" display="inline-block">{label}</Text>
                )
            }
            <Controller
                name={name}
                control={control}
                defaultValue={controlledValue}
                render={({ field: {ref, onChange, value, ...select} }) => 
                    <Select {...select} ref={ref} options={options} styles={customStyles} value={options.find(c => c.value === controlledValue)} onChange={val => {onChange(val ? val.value : ""); setControlledValue(val ? val.value : "");}} {...rest}/>
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
                     <FormLabel fontSize={focus ? "11px" : "sm"} color="gray.700" mb="1" left="16px" display="inline-block" position="absolute" top={focus ? "6px" : "15px"} zIndex="2">{label}</FormLabel>
                )
            }

            <Select options={options} styles={customStyles} onFocus={() => {setFocus(true)}} onMenuClose={() => {setFocus(controlledValue !== "")}} onChange={val => {setControlledValue(val ? val.value : ""); setFocus(val !== undefined)}} {...rest}/>
        
            {/* { !!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>   
            )} */}
        </FormControl>

    );
}