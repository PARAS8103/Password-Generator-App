const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator('white');

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
function setIndicator(color){
     indicator.style.backgroundColor=color;
     indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
   }
// pehla?
function getRandomInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}
function getRandomNumber(){
   return getRandomInteger(0,9);
}
function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
 }
 function getRandomUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
 }
//  ?doosra

 function generateSymbol(){
    const number=getRandomInteger(0,symbols.length);
    return symbols.charAt(number);
 }

 function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  

    if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator('green');
    }
    else if(hasUpper&&(hasLower||hasSym)&&passwordLength>=6){
        setIndicator('yellow');
    }
    else{
        setIndicator('red');
    }
 }

 async function copyContent(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
 setTimeout(()=>{
    copyMsg.classList.remove("active");
 },2000);
}
// teesra?
inputSlider.addEventListener('input',(e)=>{
passwordLength=e.target.value;
handleSlider();
});

copyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value){
      copyContent();
   }
});
// function handleCheckbox{
function handleCheckBoxChange(){
   checkCount=0;
    allCheckBox.forEach(checkbox => {
      if(checkbox.checked){
         checkCount++;
      }
   });
   if(passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider;
   }
}
// ?chota?
allCheckBox.forEach((checkbox)=>{
   checkbox.addEventListener('change',handleCheckBoxChange);
})

function shufflePassword(array){
   for(let i= array.length-1;i>0;i--){
      const j= Math.floor(Math.random()*(i+1));
   
      const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
   }
   let str = "";
   array.forEach((el) => (str += el));
   return str;
}

generateBtn.addEventListener('click',()=>{
   if(checkCount==0){
      return;
   }

   if(passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
  }
     password="";
      let funcArr=[];

      if(uppercaseCheck.checked)
        funcArr.push(getRandomUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(getRandomLowercase);

    if(numbersCheck.checked)
        funcArr.push(getRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);



        for(let i=0; i<funcArr.length; i++) {
         password += funcArr[i]();
      }
      for(let i=0;i<passwordLength-funcArr.length;i++){
         let Index=getRandomInteger(0,funcArr.length);
         // console.log("randIndex" + randIndex);
        
         password+=funcArr[Index]()
      }
     
   //   console.log("Remaining adddition done");

           password=shufflePassword(Array.from(password));
           passwordDisplay.value=password;
    console.log("UI adddition done");
         
           calcStrength();
      });