type ValidationResult = string | boolean
type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

export const nameRules: ValidationRule[] = [
  (v: string) => !!v || 'Nombre es requerido',
  (v: string) => /^[a-zA-Z ]*$/.test(v) || 'Nombre tiene que ser valido',
  (v: string) => v.length <= 20 || 'Nombre debe ser menor a 20 caracteres',
]
export const numberRules: ValidationRule[] = [
  (v: string) => !!v || 'Numero requerido',
  (v: string) => /^[0-9]*$/.test(v) || 'Numero Invalido',
  (v: string) => v.length <= 20 || 'Max. numero 20',
]
export const radioRules: ValidationRule[] = [
  (v: string) => !!v || 'Rol es requerido',
]
