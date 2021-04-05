import { reactive } from 'Vucript';

const state:reactive<{messageOne:string}> = {messageOne:"hello"};
let messageTwo:reactive<string>="こんにちは";
let change = ()=>{
    messageTwo+="こんにちは";
}

function change2(){
    messageTwo+="こんばんは"
}

let onMounted = ()=>{
    console.log("マウントされました");
    change();
}