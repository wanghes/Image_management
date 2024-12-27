import request from "@/utils/request";

export function fetchList(data) {
    return request({
        url: "/api/images",
        method: "post",
        data,
    });
}

export function uploadfile(params) {
    return request({
        url: "/api/uploadfile",
        method: "post",
        data: params,
        headers: {
            "Content-Type": "multipart/form-data;charset=utf-8",
        },
    });
}

export function delFile(id) {
    return request({
        url: "/api/list/" + id,
        method: "DELETE",
    });
}
