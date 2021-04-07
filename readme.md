# Vucript

Vucript is a typescript dialect that compiles to components of Vue.

With Vucript, you can write your Vue components more simply than normal TypeScript.

## Installation

### Vue CLI Plugin (Recommended)

To use Vucript in your Vue CLI project, you need to run

```bash
$ vue add vucript
```

### NPM Installation

If you want to install to non-Vue CLI project, you need to run

```bash
$ npm install vucript --save-dev
```

## Documentation

You can check our documentation of Vucript [here](https://s19514tt.gitbook.io/vucript-documentation/).

## Example

Let's write a simple counter app in Vucript.

```typescript
import { reactive, computed } from 'Vucript';
let counter:reactive<number> = 0;
let add = () => {
  counter++;
};
const twiceTheCounter:computed<number> = (()=>counter*2);
```

Vucript compiler transforms the above to Vue Composition API Code

```typescript
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const counter = ref<number>(0);
    const add = () => {
      counter.value++;
    };
    const twiceTheCounter = computed(() => counter.value*2);
    return { counter, add, twiceTheCounter };
  },
});
```

Vucript code is more simple than normal Vue Composition API code!

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
const twiceTheCounter:computed<number> = (()=>counter*2);
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

```typescript
import Vucript from "vucript";

let compiled = Vucript.compile(`let counter:reactive<number> = 0;`);//compile function returns compiled string.
Vucript.compileFile(filename, "./");//compileFile function compiles and save a file.
```

## Bug Report and Support

Please create issue on GitHub or mention [@tomu_1576](https://twitter.com/tomu_1576) on Twitter.

## We need your contribution!

Vucript is still in development and incomplete! We need your contribution to make Vucript a better project. Please feel free to mention [@tomu_1576](https://twitter.com/tomu_1576) on Twitter if you need any help about contribution!