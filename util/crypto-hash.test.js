const cryptoHash = require('./crypto-hash')

describe('cryptoHash()', () =>{

  it('generates a SHA-256 hashed output', () =>{
    expect(cryptoHash('foo'))
    .toEqual('464f0da35dc95dc2dc0bc4c84904197cb0f035eed8e08839a01515320c76c832')
  })

  it('produces the same hash with the same input argumentsin any order', () =>{
    expect(cryptoHash('one', 'two', 'three'))
    .toEqual(cryptoHash('three', 'one', 'two'))
  })

  it('producces a unique hash when the properties have changed on an input', () =>{
    const foo = {}
    const originalHash = cryptoHash(foo)
    foo['a'] = 'a'

    expect(cryptoHash(foo).not.toEqual(originalHash))
  })
})