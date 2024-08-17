import { ref, unref } from "vue";
import { Add, Sub, Mul, Div } from "@/utils/caculate";
const designWidth = ref(null)
designWidth.value = 1920
const designHeight = ref(null)
designHeight.value = 1080
const minFontSize = ref(null)
minFontSize.value = 11
const vwvalue = ref(null)
const vhvalue = ref(null)
const fontvalue = ref(null)

export const vw = ($px: number) => {
    vwvalue.value = Div($px, unref(designWidth)) * 100 + 'vw'
    return vwvalue.value
}

export const vh = ($px: number) => {
    vhvalue.value = Div($px, unref(designHeight)) * 100 + 'vh'
    console.log(vhvalue.value)
    return vhvalue.value

}
export const font = ($px: number) => {
    fontvalue.value = (Div($px, unref(designWidth)) * 100).toFixed(2) + 'vw'
    return fontvalue.value

}
//math.div($px, 1920) * 100vw;
export const efont = ($px: number, $clientWidth: number) => {
    return $px * ($clientWidth / designWidth.value)
}

