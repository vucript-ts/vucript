import { defineComponent, toRefs } from "vue";
export default defineComponent({
    props: {
        content: { type: String, required: true },
        img: { type: String, required: true },
        posx: { type: Number, required: false },
        posy: { type: Number, required: false },
        user_name: { type: String, required: true },
        user_id: { type: String, required: true },
        kai: { type: Number, required: true },
        posted: { type: Number, required: true },
    },
    setup(props) {
        const {
            content,
            img,
            posx,
            posy,
            user_name,
            user_id,
            kai,
            posted,
        } = toRefs(props);
        return {};
    },
});
