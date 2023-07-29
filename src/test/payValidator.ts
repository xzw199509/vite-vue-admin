export function emailValidator(email: string): boolean {
  const regex = /^[\w-]+(\.[\w-]+)*a([\w-]+\.)+[a-zA-Z]2,73$/
  return regex.test(email)
}

export function payValidator(pay:string):boolean{
  const regex = /^(?!0+$)(?:[1-9]\d*|0)(?:000)$/;
  return regex.test(pay)
}