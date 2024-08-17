import moment from 'moment'
import 'moment/locale/zh-cn';
//数组两两元素相除。
//arr[a,b,c,d] /arr2[a1,b1,c1,d1]
export const arrmapDiv = (arr1: any, arr2: any) => {
    const result = arr1.map((item: any, index: number) => {
        if (arr2[index] !== 0) {
            const percentage = (item / arr2[index]) * 100;
            return percentage;
        }
        else { return 0; }
    });
    return result;
}


//{10:a,9:b,8:c,7,6...3,2,1}
//多个对象按照key的数字大小转化为value的数组
export const objtoArrByNumber = (obj: any) => {
    const sortedValues = Object.entries(obj).sort((a, b) => parseInt(a[0]) - parseInt(b[0])
    ).map(([key, value]) => value);
    return sortedValues
}

//const fcoord = [12, 34, 56, 78, 99, 101];
export const pairArray = (fcoord: any) => {
    const result = fcoord.reduce((res, value, index, array) => {
        if (index % 2 === 0) {
            res.push(array.slice(index, index + 2));
        }
        return res;
    }, []);
    return result
}

//判断一个对象的属性是否都为空,除了id,type
export const isAllPropertiesEmpty = (obj: any, type: string) => {
    if (type === "overlay") {
        const { id, icontype, offset, ...otherProperties } = obj;
        return Object.values(otherProperties).every(value => value === '');
    }
    else if (type === "feature") {
        const { id, rotation, ...otherProperties } = obj;
        return Object.values(otherProperties).every(value => value === '');
    }
};


