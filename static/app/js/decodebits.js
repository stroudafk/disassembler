//only takes 32bit instructions
//check that instruction.length === 32 before calling

const input = document.querySelector('input');
const preview = document.querySelector('.preview');
input.style.opacity = 0;

input.addEventListener('change', validateInput);
function validateInput(){
  alert('Received file');
  start('00001000000100000000000000000001\n00100001001010000000000000001111\n00000000010000000000000000001000\n00000000000000000000000000001100\n00000001001010100100000000100000\n00000001000010010010000000100000\n');

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
    [ 0x12, 'mflo'], [0x0, 'mfc0'], [0x18, 'mult'], [0x19, 'multu'], [0x3, 'sra'],[0xc, 'syscall'],[0xd,'break']]);

  //the i and j types will hold pairs of the string and opcode, where the opcode 
  // is the key and the instruction is the value 

  const i_instructions = new Map([[0x8, 'addi'], [0x9, 'addiu'], [0xc, 'andi'], 
    [0x4, 'beq'], [0x5, 'bne'], [0x24, 'lbu'], [0x25, 'lhu'], [0x30, 'll'], 
    [0xf, 'lui'], [0x23, 'lw'], [0xd, 'ori'], [0xa, 'slti'], [0xb, 'sltiu'], 
    [0x28, 'sb'], [0x38, 'sc'], [0x29, 'sh'], [0x2b, 'sw']]); 
  //TODO: ask about lwc1, ldc1, swc1, and sdc1, then add to map

  const j_instructions = new Map([[0x2, 'j'], [0x3, 'jal']]);
  const verilog_keys = new Map([['add','3rdrsrt'],['addu', '3rdrsrt'],['and','3rdrsrt'],['break', '0'],['div', '2rsrt'],['divu', '2rsrt'],['jr', '1rs'],['mfhi', '1rd'],['mflo', '1rd'],['mult','2rsrt'], ['multu', '2rsrt'],['nor', '3rdrsrt'], ['or', '3rdrsrt'], ['or', '3rdrsrt'], ['sll', '3rdrtsa'],['sllv', '3rdrtrs'],['slt','3rdrsrt'],['sltu','3rdrsrt'],['sra', '3rdrtsa'], ['srl', '3rdrtrs'],['srlv', '3rdrsrt'],['sub', '3rdrsrt'],['subu', '3rdrsrt'],['syscall', '0'],['addi', '3rtrsim'],['addiu', '3rtrsim'],['andi', '3rtrsim'],['beq', '3rsrtlabel'],['bgez','2rslabel'],['bgtz','2rslabel'],['blez','2rslabel'],['bltz','2rslabel'],['bne','3rsrtlabel'],['lb', '2rtim(rs)'],['lbu','2rtim(rs)'],['lh', '2rtim(rs)'],['lhu','2rsim(rs)'],['lui','2rtim'],['lw','2rtim(rs)'],['lwcl', '2rtim(rs)'],['ori','3rtrsim'],['sb','2im(rs)'],['slti','3rtrsim'],['sltiu','3rtrsim'],['sh', '2rtim(rs)'],['sw','2rtim(rs)'],['swcl','2rtim(rs)'],['xori','3rtrsim'],['j','1label'],['jal','1label'],['jr','1rs']]);

  function start(instructions){
    var delimiter = '\n'      
    const output=[];
    var i = 0;
    var j = 0;
    while((j = instructions.indexOf(delimiter, i)) !== -1){
      var line = instructions.substring(i,j)
      var opcode = getOpcode(line);
console.log(opcode)
      var instType = getInstrType(opcode);
console.log(instType)
      var instance=""
      if(instType === 'R'){
        var funct = decodeFunct(line)
        instance = r_instructions.get(funct); 
      }
      else if (instType === 'I'){
        var key = parseInt(opcode, 2)
        instance = i_instructions.get(key)
      }
      else if(instType === 'J'){
        var key = parseInt(opcode, 2)
        instance = j_instructions.get(key)
      }
      else if(instType === 'F'){
        output.push('FI and FR instructions not yet implemented')
        i = j+1;
        continue
      }
      console.log('instance: ')
      console.log(instance)
      let format = verilog_keys.get(instance);
      console.log(format)
      let fields = parseInt(format.substr(0,1))
      format = format.substr(1,format.length-1)
      if(fields === 0){
        output.push(instance)
        i = j+1;
        continue
      }else if (fields === 1){
	if(format.length>2){
          instance += ' label'
	}
        else{
	  instance += ' '
          instance += computeRegister(separateRS(line))
        }
	output.push(instance)
        i = j+1;
        continue;
      }else{
	console.log(instance)
        for(let k = 0; k<format.length; k+=2){
          let temp = format[0+k] + format[1+k]
		console.log(temp)
          if(temp === 'rs'){
	    instance += ' ';
	    let rs = separateRS(line)
	    instance += computeRegister(rs)
          }else if(temp === 'rt'){
	    instance += ' ';
	    let rt = separateRT(line)
	    instance += computeRegister(rt)
          }else if (temp === 'rd'){
	    instance += ' ';
	    let rd = separateRD(line)
            instance += computeRegister(rd)
          }
          else if(temp === 'im'){
            let im = decodeImmediate(line)
            instance += ' '
            instance += im;
            if(k+2 < fields.length){
              instance += '('
	      instance += computerRegister(separateRS(line))
	      instance += ')'
              break
            }
          }
       }
    }
     output.push(instance)
     i = j+1;
   }
    //console.log(instructions.substring(i));
    console.log(output)
    return output
  }
  function getOpcode(instruction = '0123456'){
    return instruction.substr(0,6)
  }

  //if opcode == 11(hex), FR or FI type
  function getInstrType(opcode = '000000'){
    let decoded = parseInt(opcode, 2)
    if(decoded === 0){
      return 'R'
    }
    else if(decoded === 0x11){
      return 'F' //TODO: for now. will change to handle FI types later
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
  function separateRS(instruction){
    return instruction.substr(6,5);
  }  
  function separateRT(instruction){  
    return instruction.substr(11,5);  
  }
  function separateRD(instruction){  
    return instruction.substr(16,5);
  }  
  function computeRegister(regBits){
    var pos = parseInt(regBits, 2)
    console.log(pos)
    var register = registers[pos]
    console.log(register)
    return register //returns string of decoded register vals
  }
  function decodeShamt(shamtBits){
    var shamt = instruction.substr(6,5);
    return parseInt(shamt, 2)
  }
  function decodeFunct(instruction){
    var funct = instruction.substr(26,6);
    return parseInt(funct,2)
  }
  function decodeImmediate(instruction){
    var immediate = instruction.substr(16,16);
    return parseInt(immediate,2)
  }
  function decodeAddress(addressBits){
    var address = instruction.substr(6,26);
    return parseInt(address, 2)
  }

function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
 ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}
function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

