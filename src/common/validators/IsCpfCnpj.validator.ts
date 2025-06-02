import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfOrCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    if (typeof value !== 'string') return false;
    const clean = value.replace(/\D/g, '');
    if (clean.length === 11) return isValidCpf(clean);
    if (clean.length === 14) return isValidCnpj(clean);
    return false;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'CPF ou CNPJ inválido';
  }
}

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCpfOrCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCpfOrCnpjConstraint,
    });
  };
}

export function isValidCpf(cpf: string): boolean {
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  return d2 === parseInt(cpf[10]);
}

export function isValidCnpj(cnpj: string): boolean {
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const calc = (x: number[]) => {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += parseInt(cnpj[i]) * x[i];
    }
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const d1 = calc(weights1);
  const d2 = calc(weights2);

  return d1 === parseInt(cnpj[12]) && d2 === parseInt(cnpj[13]);
}
