import { InputProps } from "@chakra-ui/react";
import { Controller, FieldError, UseFormRegister } from "react-hook-form";
import { Slider, SliderProps } from ".";

interface FormSliderProps extends SliderProps{
    name: string;
    type: string;
    value?: number;
    variant?: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    mask?: "phone" | "cpf" | "cnpj" | "money" | "";
    error?: FieldError;
    label?: string;
}

interface ControlledSliderProps extends FormSliderProps{
    register?: UseFormRegister<any>;
    control?: any;
}

export function ControlledSlider({control, name, value, error, type, label, ...rest}:ControlledSliderProps){
    return(
        <Controller
            name={name}
            control={control}
            defaultValue={value}
            render={({ field: {ref, ...field} }) => 
                <Slider inputRef={ref} {...field} name={name} type={type} value={value} error={error} {...rest} label={label}/>
            }
        />
    );
}