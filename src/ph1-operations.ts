import Operation from "./interface/operations";

export default class Ph1Operations implements Operation {
  nop() {}

  ldr(value) {
    const ac =  value
  }

  str() {

  } 

  add(value) {
    let ac = 0
    ac += value
  } 

  sub(value) {
    let ac = 0
    ac -= value
  } 

  mul(value) {
    let ac = 0
    ac *= value
  } 

  div(value) {
    let ac = 0
    ac /= value
  } 

  not(value) {
    let ac = 0
    ac = ~ac
  } 

  and(value) {
    let ac = 0
    ac = ac & value
  } 

  or(value) {
    let ac = 0
    ac = ac | value
  }

  xor(value) {
    let ac = 0
    ac = ac ^ value
  }

  jmp() {

  }

  jeq() {

  }

  jg() {

  }

  jl() {

  }

  hlt() {

  }

}