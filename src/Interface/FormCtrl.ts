/**
 * Custom Form Control Interface with validation object
 */
interface FormCtrl<T> {
    value: T, 
    validate: any, 
    isError?: boolean,
    errorMessage?: string
  }
  export default FormCtrl