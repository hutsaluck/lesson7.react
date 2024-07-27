const baseUrl: string = `https://jsonplaceholder.typicode.com`;

type IUrls = {
    usersUrls: {
        all: string
        oneById: (id: number) => string,
        withPosts: (id: number) => string,
    },
    postsUrls: {
        all: string
        allWithPagination: (page: number, limit: number) => string,
        oneById: (id: number) => string,
        withUser: (id: number, page: number, limit: number) => string,
    },
    commentsUrls: {
        all: string
        allWithPagination: (page: number, limit: number) => string,
        oneById: (id: number) => string,
        withPost: (id: number, page: number, limit: number) => string,
    }
}

const urls: IUrls = {
    usersUrls: {
        all: `/users`,
        oneById: (id: number): string => `/users/${id}`,
        withPosts: (id: number): string => `/users/${id}/posts`,
    },
    postsUrls: {
        all: `/posts`,
        allWithPagination: (page: number, limit: number): string => `/posts?_page=${page}&_limit=${limit}`,
        oneById: (id: number): string => `/posts/${id}`,
        withUser: (id: number, page: number, limit: number): string => `/posts/?userId=${id}&_page=${page}&_limit=${limit}`,
    },
    commentsUrls: {
        all: `/comments`,
        allWithPagination: (page: number, limit: number): string => `/comments?_page=${page}&_limit=${limit}`,
        withPost: (id: number, page: number, limit: number): string => `/posts/${id}/comments?_page=${page}&_limit=${limit}`,
        oneById: (id: number): string => `/comments/${id}`,
    }
}

export {urls, baseUrl}