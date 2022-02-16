
let baseUrl;
if(process.env.NODE_ENV  == 'development'){
    // baseUrl = 'http://192.168.103.40:8004';
    baseUrl= '';
}else if(process.env.VUE_APP_MODE  == 'production'){
    baseUrl = process.env.VUE_APP_API_URl;
}else if(process.env.VUE_APP_MODE  == 'test'){
    baseUrl = process.env.VUE_APP_API_URl;
}
export function getCurrentTime() {
    //获取当前时间并打印
    var _this = this;
　　let yy = new Date().getFullYear();
　　let mm = new Date().getMonth()+1;
　　let dd = new Date().getDate();
　　let hh = new Date().getHours();
　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
　　let gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss; 
    return gettime
}

export  { baseUrl };