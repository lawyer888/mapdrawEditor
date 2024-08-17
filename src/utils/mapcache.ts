
import localforage from 'localforage'

let tileCacheStore: any = null;
// 从缓存中获取该瓦片
const loadFromCache = (src: any) => {
    if (tileCacheStore === null) {
        tileCacheStore = localforage.createInstance({
            name: "tileCacheStore",//设置数据库名称
            driver: localforage.INDEXEDDB,//使用浏览器内置IndexDB数据库
        });
    }
    return tileCacheStore.getItem(src);
}

// 将该瓦片缓存
const cacheTile = (src: any, img: any) => {
    tileCacheStore.setItem(src, img)
}
// 触发重试的错误码
const retryCodes = [400, 500];
const retries = {};

//瓦片加载事件
export const wmtsTileLoadFunction = (imageTile: any, src: any) => {
    const image = imageTile.getImage();
    // 检查缓存中是否已经存在该瓦片
    loadFromCache(src).then((tileCache: any) => {
        if (tileCache != null) {
            // 如果已经存在，直接使用缓存的瓦片替换图片瓦片
            const imageUrl = URL.createObjectURL(tileCache);
            image.src = imageUrl;
            console.log("命中瓦片缓存")
            return;
        } else {
            fetch(src, {
                method: 'GET',
                keepalive: true,
                cache: "force-cache"
            }).then((response) => {
                if (retryCodes.includes(response.status)) {
                    retries[src] = (retries[src] || 0) + 1;
                    if (retries[src] < 3) {
                        console.log("请求瓦片失败，重新尝试次数：" + retries[src])
                        setTimeout(() => imageTile.load(), retries[src] * 250);
                    }
                    return Promise.reject();
                }
                return response.blob();
            })
                .then((blob) => {
                    const imageUrl = URL.createObjectURL(blob);
                    image.src = imageUrl;
                    cacheTile(src, blob);
                })
                .catch(() => imageTile.setState(3)); // error
        }
    })
};


