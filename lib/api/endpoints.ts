//backend routes
export const API = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        UPDATE_PROFILE: "/api/auth/profile",
        CHANGE_PASSWORD: "/api/auth/change-password"
    },
    PRODUCTS: {
        GET_ALL: "/api/products",
        GET_BY_ID: "/api/products",
        SEARCH: "/api/products/search",
        BY_CATEGORY: "/api/products/category",
        CREATE: "/api/products",
        UPDATE: "/api/products",
        DELETE: "/api/products",
        UPDATE_STOCK: "/api/products"
    },
    ORDERS: {
        CREATE: "/api/orders",
        GET_MY_ORDERS: "/api/orders/my-orders",
        GET_BY_ID: "/api/orders",
        GET_ALL: "/api/orders",
        UPDATE_STATUS: "/api/orders",
        DELETE: "/api/orders"
    },
    ADMIN: {
        USERS: {
            GET_ALL: "/api/admin/users",
            GET_BY_ID: "/api/admin/users",
            CREATE: "/api/admin/users",
            UPDATE: "/api/admin/users",
            DELETE: "/api/admin/users"
        }
    }
}