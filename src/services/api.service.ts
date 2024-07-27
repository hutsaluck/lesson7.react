import axios, {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";
import {IPost} from "../models/IPost";
import {baseUrl, urls} from '../constants/urls'
import {IComment} from "../models/IComment";

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

const axiosInstancePost = axios.create({
    baseURL: baseUrl,
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
});

const userService = {
    getAllUsers: async (): Promise<IUser[]> => {
        const axiosResponse: AxiosResponse<IUser[]> = await axiosInstance.get<IUser[]>(urls.usersUrls.all)
        return axiosResponse.data
    },
    getUserById: async (id: number): Promise<IUser> => {
        const axiosResponse: AxiosResponse<IUser> = await axiosInstance.get<IUser>(urls.usersUrls.oneById(id))
        return axiosResponse.data
    },
    getPostsOfUserById: async (id: number): Promise<IPost[]> => {
        const axiosResponse: AxiosResponse<IPost[]> = await axiosInstancePost.post(urls.usersUrls.withPosts(id))
        return axiosResponse.data
    },
}

const postService = {
    getAllPosts: async (): Promise<IPost[]> => {
        const axiosResponse: AxiosResponse<IPost[]> = await axiosInstance.get<IPost[]>(urls.postsUrls.all)
        return axiosResponse.data
    },
    getAllWithPagination: async (page: number, limit: number): Promise<{ data: IPost[]; totalCount: number }> => {
        const axiosResponse: AxiosResponse<IPost[]> = await axiosInstance.get<IPost[]>(urls.postsUrls.allWithPagination(page, limit))
        const {data, headers} = axiosResponse
        const totalCount = headers["x-total-count"];

        return {data, totalCount}
    },
    getPostById: async (id: number): Promise<IPost> => {
        const axiosResponse: AxiosResponse<IPost> = await axiosInstance.get<IPost>(urls.postsUrls.oneById(id))
        return axiosResponse.data
    },
    getPostsOfUserById: async (id: number, page: number, limit: number): Promise<{ data: IPost[]; totalCount: number }> => {
        const axiosResponse: AxiosResponse<IPost[]> = await axiosInstance.get<IPost[]>(urls.postsUrls.withUser(id, page, limit))
        const {data, headers} = axiosResponse
        const totalCount = headers["x-total-count"];

        return {data, totalCount}
    },
    createPost: async (post: IPost): Promise<IPost> => {
        const axiosResponse: AxiosResponse<IPost> = await axiosInstance.post<IPost>(urls.postsUrls.all, post)
        return axiosResponse.data
    },
}

const commentService = {
    getAllComments: async (): Promise<IComment[]> => {
        const axiosResponse: AxiosResponse<IComment[]> = await axiosInstance.get<IComment[]>(urls.commentsUrls.all)
        return axiosResponse.data
    },
    getAllWithPagination: async (page: number, limit: number): Promise<{data: IComment[], totalCount: number}> => {
        const axiosResponse: AxiosResponse<IComment[]> = await axiosInstance.get<IComment[]>(urls.commentsUrls.allWithPagination(page, limit))
        const {data, headers} = axiosResponse
        const totalCount = headers["x-total-count"];

        return {data, totalCount}
    },
    getCommentsOfPostById: async (id: number, page: number, limit: number): Promise<{data: IComment[], totalCount: number}> => {
        const axiosResponse: AxiosResponse<IComment[]> = await axiosInstance.get<IComment[]>(urls.commentsUrls.withPost(id, page, limit))
        const {data, headers} = axiosResponse
        const totalCount = headers["x-total-count"];

        return {data, totalCount}
    },
    getCommentById: async (id: number): Promise<IComment> => {
        const axiosResponse: AxiosResponse<IComment> = await axiosInstance.get<IComment>(urls.commentsUrls.oneById(id))
        return axiosResponse.data
    },
}

export {userService, postService, commentService}