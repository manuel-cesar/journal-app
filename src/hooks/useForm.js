import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, SetFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [ formState ]);

    useEffect(() => {
      setFormState( initialForm );     
    }, [initialForm])
    

    const isFormValid = useMemo( () => {
        
        for (const field of Object.keys( formValidation )) {
            if( formValidation[field] !== null ) return false;
        }
        
        return true;
    }, [ formValidation ])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const field of Object.keys( formValidations )) {
            const [ fn, errorMessage = 'Campo invalido'] = formValidations[field];

            formCheckedValues[`${ field }Valid`] = fn( formState[field] ) ? null : errorMessage;
        }

        SetFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}