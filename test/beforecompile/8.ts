import { reactive } from "Vucript";
import axios from "axios";
let yesno: reactive<string> = "thinking";
const onMounted = async () => {
    try {
        const response = await axios.get("https://yesno.wtf/api");
        yesno = response.data["answer"];
    } catch (error) {
        console.error(error);
    }
};
