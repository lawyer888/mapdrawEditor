// store/index.js
import { createStore } from 'vuex'
import { hasChinese, findArrayContainingObject } from '@/utils/mapservice';
export default createStore({
    state: {
        mapbase_value: null, //用于保存地图底图信息
        pointData: [] // 存储点数据的状态
    },
    mutations: {
        setPointData(state, payload) {
            state.pointData = payload;
            localStorage.setItem('pointData', JSON.stringify(state.pointData));
        }
    },
    actions: {
        fetchPointData({ commit }) {
            // 模拟异步获取JSON数据
            setTimeout(() => {
                const pointJSON = [[]]//此处二维数组对象为地图上你需要的图标点位的坐标和数据信息
                //加入拐点数据
                const localpointData = localStorage.getItem('pointData')
                if (localpointData && localpointData != "") {
                    let data = JSON.parse(localpointData)
                    commit('setPointData', data)
                }
                else {
                    commit('setPointData', pointJSON);
                }
            }, 1000);
        },
    },
    getters: {
        getAllPoints: state => {
            return state.pointData.flat(2);
        },
        getPointByName: state => name => {
            if (hasChinese(name)) {
                return state.pointData.flat(2).filter(point => point.name === name);
            }
            else {
                let linename = state.pointData.flat(2).filter(point => point.linename === name);
                const result = findArrayContainingObject(state.pointData.flat(1), linename[1]);
                return result;
            }
        }
    }
})


