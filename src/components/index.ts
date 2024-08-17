import { App } from 'vue'
import trafficmap from './trafficmap.vue'
const allcomponent = { trafficmap }
export default {
    install(app: App): void {  //app是一个对象
        Object.keys(allcomponent).forEach((name: any) => {
            app.component(name, allcomponent[name])
        })
    }
}
