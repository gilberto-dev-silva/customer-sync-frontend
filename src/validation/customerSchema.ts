import * as yup from 'yup'

export const customerSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  cpf_cnpj: yup
    .string()
    .required('CPF ou CNPJ é obrigatório')
    .test('cpf-cnpj-length', 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos', (value) => {
      const numeric = (value ?? '').replace(/\D/g, '')
      return numeric.length === 11 || numeric.length === 14
    }),
  telephone: yup.string().min(10).required(),
  person_type: yup.string().oneOf(['Física', 'Jurídica']).required(),
  date_of_birth: yup.date().required(),
  address: yup.object({
    city: yup.string().required(),
    uf: yup.string().length(2).required(),
    neighborhood: yup.string().required(),
    address: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
  }),
  profession_id: yup.number().required(),
})
