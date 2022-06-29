import { reactive, computed } from "vucript";
import { nanoid } from "nanoid";
import axios from "axios";
const ans: reactive<string> = "";
let result: reactive<string> = "";
const add = async () => {
  const ansone = (await axios.get("https://yesno.wtf/api")).data.answer;
  if (ansone == ans) {
    result = "正解";
  } else {
    result = "不正解";
  }
};