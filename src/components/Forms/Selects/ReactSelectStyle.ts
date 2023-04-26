export const customStyles = {
    container: (styles:any) => ({ 
        ...styles,
        height: '50px',
    }),
    valueContainer: (styles:any) => ({ 
        ...styles,
        height: '50px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
    }),
    input: (styles:any) => ({ 
        ...styles ,
        fontSize: "14px",
        fontWeight: '600'
    }),
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#000' : 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      ':hover': {
        backgroundColor: !state.isSelected ? "#ddd" : "#000",
        color: !state.isSelected ? "#000" : "#ffffff"
      },
    }),
    control: (styles: any, state: any) => ({ 
        ...styles, 
        backgroundColor: '#f7f7fc' , 
        height: '50px',
        border: '1px solid #e2e8f0',
        borderRadius: '3px',
        borderColor: state.isFocused ? "#000" : "#dddddd",
        //':focus': {
            boxShadow: state.isFocused ? "0 0 0 2px #000" : "",
        //},
        ':hover': {
            borderColor: state.isFocused ? "#000" : "#dddddd",
            backgroundColor: '#d9dbe9'
        },
    }),
    placeholder: (styles: any, state: any) => ({ 
        ...styles, 
        opacity: '0' ,
        position: 'absolute',
        display: 'block',
        top: state.isFocused ? "-8px" : '4px',
        left: '0',
        fontSize: state.isFocused ? "11px" : '15px',
        transition: 'all ease-in 0.1s',
        ':focus': {
            top: "-15px"
        },
    }),
    dropdownIndicator: (styles: any, state: any) => ({ 
        ...styles,
        width: '34px',
        height: '34px',
        paddingRight: '10px'
    }),
    singleValue: (provided:any, state:any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const color = "#000";
  
      return { ...provided, opacity, transition, color, fontSize: '14px', fontWeight: '600' };
    }
}