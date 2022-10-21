<template>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img v-if="logo" width="100" src="../../../assets/img_logo.png" class="sidebar-logo" />
                <!-- <h1 v-else class="sidebar-title">{{ title }}</h1> -->
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" width="30" src="../../../assets/logo.png" class="sidebar-logo" />
                <!-- <h1 class="sidebar-title">{{ title }}</h1> -->
            </router-link>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SidebarLogo",
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                title: "图片管理系统",
                logo: true
            };
        }
    };

</script>

<style lang="scss" scoped>
    .sidebarLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to {
        opacity: 0;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 100px;
        line-height: auto;
        background: #fff;
        text-align: center;
        overflow: hidden;

        & .sidebar-logo-link {
            height: 100%;
            width: 100%;

            & .sidebar-logo {
                width: 100px;
                height: 100px;
            }

            & .sidebar-title {
                display: inline-block;
                margin: 0;
                color: #1890ff;
                font-weight: 600;
                line-height: auto;
                margin-top: 5px;
                font-size: 18px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            }
        }

        &.collapse {
            .sidebar-logo {
				width: 30px;
                height: 30px;
                margin-right: 0px;
            }
        }
    }

</style>
