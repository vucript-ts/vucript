import { reactive ,computed,importComponent} from 'Vucript';
importComponent('@/components/HelloWorld.vue','HelloWorld');
let counter:reactive<number>=0;
const add=()=>{
    counter++;
}
let twiceCounter:computed<number>=()=>counter*2;