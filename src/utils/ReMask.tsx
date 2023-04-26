import { toPattern, toMoney } from 'vanilla-masker';

export const unMask = (value:string) => value.replace(/\W/g, '');

const masker = (value: string, pattern: string) =>
	toPattern(value, { pattern })

const multimasker = (value: string, patterns: string[]) =>
	masker(
		value,
		patterns.reduce(
			(memo, pattern) => (value.length <= unMask(memo).length ? memo : pattern),
			patterns[0]
		)
	)

export const mask = (value: string, pattern: string | string[]) =>
	typeof pattern === 'string'
		? masker(value, pattern || '')
		: multimasker(value, pattern)

export const maskMoney = (value: string) => {
	const moneyOptions = {
		// Decimal precision -> "90"
		precision: 2,
		// Decimal separator -> ",90"
		separator: ',',
		// Number delimiter -> "12.345.678"
		delimiter: '.',
		// Money unit -> "R$ 12.345.678,90"
		unit: 'R$',
		// Force type only number instead decimal,
		// masking decimals with ",00"
		// Zero cents -> "R$ 1.234.567.890,00"
		//zeroCents: true
	}

	return toMoney(value, moneyOptions);
}
	