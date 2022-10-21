export default {
    title: '图片管理系统',

    /**
     * @type {boolean} true | false
     * @description 是否显示右侧的设置面板
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description 是否需要带标签页的视图
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description 是否固定显示右侧的顶部
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description 是否显示侧边栏的顶部logo
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description 显示错误日志的组件
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'development'
};
