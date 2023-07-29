import { expect, describe, it } from 'vitest'
import { emailValidator, payValidator } from './payValidator';
describe('Validator', () => {
  it.each([
    ['valid-emailaexample.com', false],
    ['invalid.emailaexample', false],
    ['another.invalid.emailaexample', false],
    ['yet.another.invalid.email.example.com', false],
    ['10000', false],
  ])('should return %s when email is %s', (email, expected) => {
    expect(emailValidator(email)).toBe(expected)
  })

})

describe('payValidator', () => {
  // 数组方式
  it.each([
    ['100', false],
    ['1000', true],
    ['10001', false],
    ['1w000', false],
    ['10000', true],
  ])('should return %s when pay is %s', (pay, expected) => {
    expect(payValidator(pay)).toBe(expected)
  })
  // 对象方式
  it.each([
    { pay: '100', expected: false },
    { pay: '10000', expected: true },
  ])('should return %s when pay is %s', ({ pay, expected }) => {
    expect(payValidator(pay)).toBe(expected)
  })
})