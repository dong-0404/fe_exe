import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    selectPosts,
    selectLoading,
    selectError,
    selectCurrentPage,
    selectTotalPages,
    selectFilters
} from '../communitySelectors'
import {
    fetchPosts,
    createPost,
    likePost,
    sharePost,
    deletePost,
    addComment,
    likeComment,
    deleteComment
} from '../communityThunks'
import { setFilters, setCurrentPage } from '../communitySlice'
import type { CreatePostPayload, CreateCommentPayload, PostFilters } from '../types'

export const useCommunity = () => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)
    const currentPage = useAppSelector(selectCurrentPage)
    const totalPages = useAppSelector(selectTotalPages)
    const filters = useAppSelector(selectFilters)

    // Fetch posts
    const loadPosts = useCallback(
        (params?: { page?: number; limit?: number; filters?: PostFilters }) => {
            return dispatch(
                fetchPosts({
                    page: params?.page || currentPage,
                    limit: params?.limit || 10,
                    ...params?.filters
                })
            )
        },
        [dispatch, currentPage]
    )

    // Create post
    const handleCreatePost = useCallback(
        (payload: CreatePostPayload) => {
            return dispatch(createPost(payload))
        },
        [dispatch]
    )

    // Like post
    const handleLikePost = useCallback(
        (postId: string) => {
            return dispatch(likePost(postId))
        },
        [dispatch]
    )

    // Share post
    const handleSharePost = useCallback(
        (postId: string) => {
            return dispatch(sharePost(postId))
        },
        [dispatch]
    )

    // Delete post
    const handleDeletePost = useCallback(
        (postId: string) => {
            return dispatch(deletePost(postId))
        },
        [dispatch]
    )

    // Add comment
    const handleAddComment = useCallback(
        (postId: string, payload: CreateCommentPayload) => {
            return dispatch(addComment({ postId, payload }))
        },
        [dispatch]
    )

    // Like comment
    const handleLikeComment = useCallback(
        (postId: string, commentId: string) => {
            return dispatch(likeComment({ postId, commentId }))
        },
        [dispatch]
    )

    // Delete comment
    const handleDeleteComment = useCallback(
        (postId: string, commentId: string) => {
            return dispatch(deleteComment({ postId, commentId }))
        },
        [dispatch]
    )

    // Set filters
    const handleSetFilters = useCallback(
        (newFilters: PostFilters) => {
            dispatch(setFilters(newFilters))
        },
        [dispatch]
    )

    // Set current page
    const handleSetCurrentPage = useCallback(
        (page: number) => {
            dispatch(setCurrentPage(page))
        },
        [dispatch]
    )

    // Load more posts (for pagination)
    const loadMore = useCallback(() => {
        if (currentPage < totalPages && !loading) {
            dispatch(setCurrentPage(currentPage + 1))
            dispatch(
                fetchPosts({
                    page: currentPage + 1,
                    limit: 10,
                    ...filters
                })
            )
        }
    }, [dispatch, currentPage, totalPages, loading, filters])

    return {
        // State
        posts,
        loading,
        error,
        currentPage,
        totalPages,
        filters,
        hasMore: currentPage < totalPages,

        // Actions
        loadPosts,
        createPost: handleCreatePost,
        likePost: handleLikePost,
        sharePost: handleSharePost,
        deletePost: handleDeletePost,
        addComment: handleAddComment,
        likeComment: handleLikeComment,
        deleteComment: handleDeleteComment,
        setFilters: handleSetFilters,
        setCurrentPage: handleSetCurrentPage,
        loadMore
    }
}
