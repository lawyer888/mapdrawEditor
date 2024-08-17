import { createVNode } from 'vue'
type PanelProperty = {
    props_id: string,
    props_name: string,
    props_type: number
};
class domGenerator {
    generateNode(panelProperty: PanelProperty) {
        const { props_id, props_name, props_type } = panelProperty;
        const children = [];
        if (props_type === 0) {
            const inputNode = this.createInputNode();
            const textNode = this.createTextNode(props_name);
            children.push(textNode, inputNode);
        } else if (props_type === 1) {
            const textareaNode = this.createTextareaNode();
            const textNode = this.createTextNode(props_name);
            children.push(textNode, textareaNode);
        } else {
            throw new Error('属性类型无效');
        }
        return createVNode('div', {
            id: props_id,
            style: {
                display: 'flex',
                gap: '10px',
                marginLeft: '34px',
                marginTop: '5px',
                marginBottom: '12px'
            }
        }, children);
    }
    createInputNode() {
        return createVNode('input', {
            style: {
                color: 'black',
                borderColor: '#c0c4cc'
            },
            // modelValue: text,
            //'onUpdate:modelValue': (newvalue: any) => { text = newvalue; },
        });
    }
    createTextareaNode() {
        return createVNode('textarea', {
            textContent: ''
        });
    }
    createTextNode(text: string) {
        return createVNode('span', {
            textContent: text + ":",
            style: {
                color: 'black'
            }
        });
    }
    createmodelDirective() {
        // 创建一个v-model指令节点
        const vmodel = {
            name: 'model',
            arg: null,
            modifiers: {},
            value: 'exampleValue'
        }
        //if (options === "v-model") {
        return vmodel
        // }
    }
}
export default domGenerator;
