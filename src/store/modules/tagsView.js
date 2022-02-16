import Cookies from 'js-cookie'
const state = {
    webSite:null,
    formVisible: false,
    msgVisible: false,
    scrollId: null,
    insertScrollId: null,
    commentNum: null
}

// const getters = {
//     getWebSiteData:(state, getters) => state.webSite ? state.webSite:Cookies.get('token'),
//     getFormVisible:(state, getters) => state.formVisible 
// }

const mutations = {
    setWebSite(state,webSite){//判断是否加一
        state.webSite = webSite
        Cookies.set('webSite', webSite, { expires: 1 })
    },
    removeWebSite(state, webSite) {
        state.webSite = webSite
        Cookies.set('webSite', webSite, { expires: 1 })
    },
    setFormVisible(state,formVisible){//判断是否加一
        state.formVisible = formVisible
        // Cookies.set('webSite', webSite, { expires: 1 })
    },
    setMsgVisible(state,msgVisible){//判断是否加一
        state.msgVisible = msgVisible
        // Cookies.set('webSite', webSite, { expires: 1 })
    },
    setScrollId(state,scrollId){//判断是否加一
        state.scrollId = scrollId,
        Cookies.set('scrollId', scrollId, { expires: 1 })
        // Cookies.set('webSite', webSite, { expires: 1 })
    },
    setInsertScrollId(state,insertScrollId){
        state.insertScrollId = insertScrollId
    },
    setCommentNum(state,commentNum){//判断消息条数
        state.commentNum = commentNum
        Cookies.set('commentNum', commentNum, { expires: 1 })
        // Cookies.set('webSite', webSite, { expires: 1 })
    },
    removeWebSite(state, webSite) {
        state.webSite = webSite
        Cookies.set('webSite', webSite, { expires: 1 })
    },
}

export default {
    // tagsView,
    namespace: true,
    state,
    // // getters,
    mutations
}