//高精度加减乘除
export const Add = (arg1, arg2) => {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(100, Math.max(r1, r2));
    return (Mul(arg1, m) + Mul(arg2, m)) / m;
}


export const Sub = (arg1, arg2) => {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((Mul(arg1, m) - Mul(arg2, m)) / m).toFixed(n);
}


export const Mul = (arg1, arg2) => {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


export const Div = (arg1, arg2) => {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return Mul(r1 / r2, Math.pow(10, t2 - t1));
}

//时间处理
//转月日
export const DateToMonthTime = (time: any) => {
    const timeArr = time.replace(" ", ":").replace(/\:/g, "-").split("-");
    const hour = timeArr[3];
    const minute = timeArr[4];
    const newtime = hour + ':' + minute;
    return newtime
}

export const DateToDayTime = (time: any) => {
    const timeArr = time.replace(" ", ":").replace(/\:/g, "-").split("-");
    const day = timeArr[2]
    return day
}
