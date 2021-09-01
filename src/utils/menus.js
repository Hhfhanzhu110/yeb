import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/menu/main/getMenusByUser").then(data => {
        if (data.data) {
            //格式化router
            let fmtRoutes = formatRoutes(data.data);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将router添加到vuex中
            store.commit("initRoutes", fmtRoutes);
        }
    });
}

export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            menuName,
            icon,
            children
        } = router;
        if (children && children.length > 0 && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: menuName,
            icon: icon,
            children,
            component(resolve) {
                if (component.startsWith('Home')) {//类似于懒加载
                    require(['../views/' + component + ".vue"], resolve);
                } else if (component.startsWith('Emp')) {//类似于懒加载
                    require(['../views/emp/' + component + ".vue"], resolve);
                } else if (component.startsWith('Per')) {
                    require(['../views/per/' + component + ".vue"], resolve);
                } else if (component.startsWith('Sal')) {
                    require(['../views/sal/' + component + ".vue"], resolve);
                } else if (component.startsWith('Sta')) {
                    require(['../views/sta/' + component + ".vue"], resolve);
                } else if (component.startsWith('Sys')) {
                    require(['../views/sys/' + component + ".vue"], resolve);
                }
            }
        }
        fmtRoutes.push(fmRouter);
    })
    return fmtRoutes;
}