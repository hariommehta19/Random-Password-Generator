const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("Lowercase");
const numberCheck = document.getElementById("Number");
const symbolCheck = document.getElementById("symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.getElementById("generateButton");
const allCheckBox = document.querySelectorAll ("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

setIndicator("#ccc");

// handle slider length
function handleSlider(){

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    
    const min = inputSlider.min;
    const max = inputSlider.max;

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
    // Math.random() give value in 0 to 9
   return Math.floor(Math.random()*(max-min))+min;

}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
  return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){

    return String.fromCharCode(getRndInteger(65,91));
  }

function generateSymbol(){

        const randNum = getRndInteger(0,symbols.length);
        return symbols.charAt(randNum);
}

function calcStrength(){

  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if(uppercaseCheck.checked) hasUpper = true;
  
  if(lowercaseCheck.checked) hasLower = true;
  
  if(numberCheck.checked) hasNum = true;
  
  if(symbolCheck.checked) hasSym = true;

  if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
    setIndicator("#0f0");
  } else if(
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ){
    setIndicator("#ff0");
} else {
  setIndicator("#f00");
}
}

async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
  }

  catch(e){

      copyMsg.innerText = "failed";
  }

  copyMsg.classList.add("active");

  setTimeout(() =>{
    copyMsg.classList.remove("active");
  },2000);
}

inputSlider.addEventListener('input',(e) =>{
  passwordLength = e.target.value;
  handleSlider();

  
})

function shufflePassword(array){
  // fisher yates method
  for(let i=array.length-1;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i]= array[j];
    array[j]=temp;
  }

  let str="";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange(){

  checkCount=0;
  allCheckBox.forEach( (checkbox) => {
    if(checkbox.checked)
        checkCount++;
     
});

  if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
   
  }
}

allCheckBox.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);

  console.log("checked");
})

copyBtn.addEventListener('click',() =>{
  if(passwordDisplay.value)
  copyContent();
})

generateBtn.addEventListener('click',() =>{

    if(checkCount == 0) 
      return;

    if(passwordLength < checkCount){
      passwordLength = checkCount;
    handleSlider();
    }
    // remove old password
    password = "";

    // 

    // if(uppercaseCheck.checked){

    //   password += generateUpperCase(); 
    // }

    
    // if(lowercaseCheck.checked){

    //   password += generateLowerCase(); 
    // }

    
    // if(numberCheck.checked){

    //   password += generatenumber(); 
    // }

    
    // if(symbolCheck.checked){

    //   password += generateSymbol(); 
    // }

let funcArr = [];

if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
  funcArr.push(generateLowerCase);

if(numberCheck.checked)
  funcArr.push(generateRandomNumber);

if(symbolCheck.checked)
  funcArr.push(generateSymbol);

for(let i = 0; i< funcArr.length; i++){
  password += funcArr[i]();
}

for(let i=0;i<passwordLength-funcArr.length;i++){
  let randIndex = getRndInteger(0,funcArr.length);
  password += funcArr[randIndex]();
}

    // shuffle the password

    password= shufflePassword(Array.from(password));

    // show in ui

    passwordDisplay.value = password;

    // calculate strength

    calcStrength();
    

})
