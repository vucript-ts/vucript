import { reactive, computed } from 'Vucript';
let counter:reactive<number> = 0;
let add = () => {
  counter++;
};
const twiceTheCounter:computed<number> = (()=>counter);
