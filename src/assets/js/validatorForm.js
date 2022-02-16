// 数字
// const numberReg = /^\d+$|^\d+[.]?\d{0,2}$/
const numberReg = /^[0-9]{1,2}$/
    //满减金额验证
const numberMaxReg = /^[0-9]{1,5}$/
    //充值金额验证
const rechargeReg = /^[1-9][0-9]{0,5}$/;
    // 中文
const cnReg = /^[\u4e00-\u9fa5]+$/
    //userNamr
const userName = /^[\u4e00-\u9fa5]{2,10}$/
    //couponTitle 优惠券名称
const couponTitle = /^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/
    //用户账号  英文数字
const NumbetAcReg = /^[A-Za-z0-9]{2,16}$/
    //中文数字字母大小写
const cnNumberAcReg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    //
    //合法url 验证
const urlrReg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    // 邮箱
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    // gw email
const gwEmail =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,100}$/;
    // 手机号
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    //isurl
const isurl = /^(?:[\w-\.]{0,255})(?:(?:\/?[^\s]{0,255}){0,255})/g //^http[s]?:\/\/.*/
// 验证 gw 用户名
const gwUser= /^[A-Za-z0-9]{4,20}$/
// 验证 gw code
const gwCode= /^[0-9]{2,8}$/
// 验证 gw  password
// const gwPwd= /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/;
const gwPwd=/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{8,20}$/

const gwUserEmail = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{4,40}$/
// 验证 gw 
export default {
    // 验证 gw 用户名
    validateGwUser: function(rule, value, callback) {
        if (!gwUser.test(value)) {
            callback(new Error('Please input 4~20, Numbers or Letters'))
        } else {
            callback()
        }
    },
    // 验证用户名和密码
    
    validateGwUserEmail: function(rule, value, callback) {
        if (!gwUserEmail.test(value)) {
            callback(new Error('Please input Email or Username'))
        } else {
            callback()
        }
    },
     // 验证 gw code
    validateGwCode: function(rule, value, callback) {
        if (!gwCode.test(value)) {
            callback(new Error('Your verification code is incorrect'))
        } else {
            callback()
        }
    },
        // 验证 gw password
    validateGwPwd: function(rule, value, callback) {
        if (!gwPwd.test(value)) {
            callback(new Error('Please input 8 letters minimum password'))
        } else {
            callback()
        }
    },
    //验证 gw email
    validateGwEmail: function(rule, value, callback) {
        if (!gwEmail.test(value)) {
            callback(new Error('Please enter the correct email format'))
        } else {
            callback()
        }
    },
    //numberMaxReg
    validateNumberMaxReg: function(rule, value, callback) {
        if (!numberMaxReg.test(value)) {
            callback(new Error('请输入最大五位数字'))
        } else {
            callback()
        }
    },
    //WithAmount //满减额度
    validateWithAmount: function(rule, value, callback) {
        if (!numberMaxReg.test(value)) {
            callback(new Error('请输入最大五位数字'))
        } else {
            callback()
        }
    },
    //充值金额
    validateRechargeReg: function(rule, value, callback) {

        if (!rechargeReg.test(value)) {//rechargeReg
            callback(new Error('请输入1-999999的数额'))
        } else {
            callback()
        }
    },
    //英文数字  用户验证
    validateNumbetAcReg: function(rule, value, callback) {
        if (!NumbetAcReg.test(value)) {
            callback(new Error('请输入英文与数字的格式'))
        } else {
            callback()
        }
    },
    //姓名验证 10位数
    validateUserName: function(rule, value, callback) {
        if (!userName.test(value)) {
            callback(new Error("请输入中文"));
        } else {
            callback()
        }
    },
    //优惠券名称验证 16位数
    validateCouponTitle: function(rule, value, callback) {
        if (!couponTitle.test(value)) {
            callback(new Error("请输入16位以内标题"));
        } else {
            callback()
        }
    },
    // 中文验证
    validateCn: function(rule, value, callback) {
        if (!cnReg.test(value)) {
            callback(new Error("请输入中文"));
        } else {
            callback()
        }
    },
    // 邮箱验证
    validateEmail: function(rule, value, callback) {
        if (!emailReg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
        } else {
            callback()
        }
    },
    // 电话验证
    validatePhone: function(rule, value, callback) {
        if (!phoneReg.test(value)) {
            callback(new Error('请输入正确的手机号码'))
        } else {
            callback()
        }
    },
    //合法url验证  充值验证
    validateUrl: function(rule, value, callback) {
        if (!urlrReg.test(value)) {
            callback(new Error('请输入正确url格式'))
        } else {
            callback()
        }
    },
    //url验证
    validateIsUrl: function(rule, value, callback) {
        if (!cnNumberAcReg.test(value)) {
            callback(new Error('请输入正确url格式'))
        } else {
            callback()
        }
    },
    //中文数字字母组合
    validateNumberAcCn: function(rule, value, callback) {
        if (!cnNumberAcReg.test(value)) {
            callback(new Error('请输入中文数字字母的格式'))
        } else {
            callback()
        }
    },
    // n*70 70取余
    validateDivide70: function(rule, value, callback) {
        if (value % 70 != 0) {
            callback(new Error('请输入70的倍数'))
        } else {
            callback()
        }
    }
}