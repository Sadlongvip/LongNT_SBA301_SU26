
import { validateField } from '../validation/Validation';

// state = {
//     values: {
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: ''
//     },
//     errors: {
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: ''
//     }
//     touched: {
//     username: false,
//     email: false,
//     password: false,
//     phoneNumber: false
//     }
// };




export const reduceForm = (state, action) => {
    switch (action.type) {
        case 'OnChange':
            const {field, value} = action.payload;
            const newValues = {...state.values, [field]: value};
            const newErrors = {...state.errors}

            if (state.touched[field]) {
                newErrors[field] = validateField(field, value, newValues);
            }

            if (field === 'password' && state.touched['confirmPassword']) {
                newErrors['confirmPassword'] = validateField('confirmPassword', state.values.confirmPassword, newValues);
            }


            return {
                ...state,
                values: newValues,
                errors: newErrors
            };
        case 'TOUCH_FIELD':
            const { field: touchField, value: touchValue } = action.payload;
            const errorMessage = validateField(touchField, touchValue || state.values[touchField], state.values);
            const newTouched = {
                ...state.touched,
                [touchField]: true
            };
            const newErrors2 = {
                ...state.errors,
                [touchField]: errorMessage
            };


            return {
                ...state,
                touched: newTouched,
                errors: newErrors2
            };
        case 'VALIDATE_FORM':
            const currentErrors = {...state.errors};
            const newTouched2 = {...state.touched};

            Object.keys(state.values).forEach(field => {
                currentErrors[field] = validateField(field, state.values[field], state.values);
                newTouched2[field] = true;
            });
            
            return {
                ...state,
                errors: currentErrors,
                touched: newTouched2
            };
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload
            };
        default:
            return state;
    }
};