//only takes 32bit instructions
//check that instruction.length === 32 before calling
//  document.getElementById("btn").onclick = test();  
  //var x = 
  //document.getElementById('btn').onclick = test()
  function test(){
  console.log("testing");
  }
  var goBtn = document.getElementById("btn");
  if (goBtn.addEventListener)
    goBtn.addEventListener("click", decodeInstruction, false);
  else if (goBtn.attachEvent)
    goBtn.attachEvent('onclick', decodeInstruction);
  var textInput = document.getElementById("bitstring");
    textInput.maxlength = 32;
  function testInput(){
    console.log(textInput.value)
  }
  function decodeInstruction(){
    console.log("decoding instruction. please wait...")
    var bits = textInput.value 
    if(bits.length != 32){
      alert("Uh oh! Recieved less than 32 bits.");
    }
    else{
      let opcode = getOpcode(bits);
      let instType = getInstrType(opcode);
      console.log(opcode)
      console.log(instType)
    }
  }
  // the r type instructions map will hold pairs of the instruction string and 
    // funct code where the key is the hex funct, and the value is the string
  const registers = ['$zero', '$at', '$v0', '$v1', '$a0', '$a1', '$a2', '$a3', 
    '$t0', '$t1', '$t2', '$t3', '$t4', '$t5', '$t6', '$t7', '$s0', '$s1', '$s2', 
    '$s3', '$s4', '$s5', '$s6', '$s7', '$t8', '$t9', '$k0', '$k1', '$gp', '$sp', 
    '$fp', '$ra'];

  const r_instructions = new Map([
    [0x20, 'add'], [0x21, 'addu'], [0x24, 'and'], [0x08, 'jr'], [0x27, 'nor'], 
    [0x25, 'or'], [0x2a, 'slt'], [ 0x2b, 'sltu',], [0x00, 'sll',], [0x02, 'srl',], 
    [0x22, 'sub'], [0x23, 'subu'], [0x1a, 'div'], [0x1b, 'divu'], [0x10, 'mfhi'], 
    [ 0x12, 'mflo'], [0x0, 'mfc0'], [0x18, 'mult'], [0x19, 'multu'], [0x3, 'sra']]);

  //the i and j types will hold pairs of the string and opcode, where the opcode 
  // is the key and the instruction is the value 

  const i_instructions = new Map([[0x8, 'addi'], [0x9, 'addiu'], [0xc, 'andi'], 
    [0x4, 'beq'], [0x5, 'bne'], [0x24, 'lbu'], [0x25, 'lhu'], [0x30, 'll'], 
    [0xf, 'lui'], [0x23, 'lw'], [0xd, 'ori'], [0xa, 'slti'], [0xb, 'sltiu'], 
    [0x28, 'sb'], [0x38, 'sc'], [0x29, 'sh'], [0x2b, 'sw']]); 
  //TODO: ask about lwc1, ldc1, swc1, and sdc1, then add to map

  const j_instructions = new Map([[0x2, 'j'], [0x3, 'jal']]);
  function getOpcode(instruction = '0123456'){
    return instruction.substr(0,6)
  }

  //if opcode == 11(hex), FR or FI type
  function getInstrType(opcode = '000000'){
    let decoded = parseInt(opcode, 16)
    if(decoded === 0){
      return 'R'
    }
    else if(decoded === 0x11){
      return 'FR' //TODO: for now. will change to handle FI types later
    }
    else{
      if(i_instructions.has(decoded)){
        return 'I'
      }
      else if(j_instructions.has(decoded)){
        return 'J'
      }
    }
  }

  function computeRegister(regBits){
    return parseInt(regBits, 10)
    //TODO: later change to return a string that is the register
  }
  function decodeShamt(shamtBits){
  return parseInt(shamt, 10)
  }
  function decodeFunct(functBits){
  return parseInt(functBits)
  }
  function decodeImmediate(immediate){
  return parseInt(immediate,10)
  }
  function decodeAddress(addressBits){
    return parseInt(addressBits, 16)
  }

