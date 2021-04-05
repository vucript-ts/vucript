# Vucript

Vucript is a typescript dialect which compiles to components of Vue.

With vucript, you can write your Vue components more simply than normal TypeScript.

## Installation

To use Vucript in your Vue CLI project, you need to run

```bash
$ vue add vucript
```

If you want to install to non-Vue CLI project, you need to run

```bash
$ npm install vucript --save-dev
```

## Example

Let's write a simple counter app in Vucript.

```typescript
import { reactive, computed } from 'Vucript';
let counter:reactive<number> = 0;
let add = () => {
  counter++;
};
const twiceTheCounter:computed<number> = (()=>counter);
```

Vucript compiler transforms the above to:

```typescript
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const counter = ref<number>(0);
    const add = () => {
      counter.value++;
    };
    const twiceTheCounter = computed(() => counter.value);
    return { counter, add, twiceTheCounter };
  },
});
```

Vucript code is more simple than normal Vue code!

## Usage

### In your Vue CLI Project

Install vue-cli-plugin-vucript first. Then, please add` lang="vucript"` to your Vue Single Component Files.

```vue
<script lang='vucript'>
import { reactive, computed } from 'Vucript';
let counter:reactive<number> = 0;
let add = () => {
  counter++;
};
const twiceTheCounter:computed<number> = (()=>counter);
</script>
```

### Command Line Tool

Please install Vucript globally to use Vucript Command Line Tool.

```bash
$ npm install -g vucript
$ vucript component.ts
```

### JS/TS API

Import Vucript and run `Vucript.compile` function!

```javascript
import Vucript from "vucript";

let compiled = Vucript.compile(`let counter:reactive<number> = 0;`);//compile function returns compiled string.
Vucript.compileFile("./test/beforecompile/" + file, "./test/compiled/");//compileFile function compiles and save a file.
```

## We need your help!

Vucript is still in development and incomplete! We need your contribution to make Vucript better project. Please feel free to mention [@tomu_1576](https://twitter.com/tomu_1576) on Twitter if you need any help about contibution!