import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useFetchData, usePostData } from '../customHooks/useFetchData';

export default function Interceptor_Get() {
    const [apiResults, setApiResults] = useState({
        posts: { data: null, loading: false, error: null, refetch: null },
        users: { data: null, loading: true, error: null, refetch: null },
    });

    const [isProductsRequest, setIsProductsRequest] = useState(false);

    const postsEndpoint = useMemo(() => '/products', []);
    const usersEndpoint = useMemo(() => '/students', []);

    const postsResult = useFetchData(postsEndpoint, isProductsRequest);
    const usersResult = useFetchData(usersEndpoint, true);

    const updateApiResults = useCallback(() => {
        setApiResults({
            posts: postsResult,
            users: usersResult,
        });
    }, [postsResult, usersResult]);

    useEffect(() => {
        updateApiResults();
    }, [updateApiResults]);

    const { posts, users } = useMemo(() => apiResults, [apiResults]);

    const isLoading = useMemo(() => posts.loading || users.loading, [posts.loading, users.loading]);

    const postsError = useMemo(() => posts.error, [posts.error]);
    const usersError = useMemo(() => users.error, [users.error]);

    const handleFetchPosts = useCallback(() => {
        if (isProductsRequest && posts.refetch) {
            posts.refetch();
        } else {
            setIsProductsRequest(true);
        }

    }, [posts.refetch]);

    const renderedContent = useMemo(() => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (postsError) {
            return <div>Error fetching posts: {postsError.message}</div>;
        }

        if (usersError) {
            return <div>Error fetching users: {usersError.message}</div>;
        }

        return (
            <div>
                <button onClick={handleFetchPosts}>Fetch Posts</button>
                <h1>Posts</h1>
                <pre>{JSON.stringify(posts.data, null, 2)}</pre>
                <h1>Users</h1>
                <pre>{JSON.stringify(users.data, null, 2)}</pre>
            </div>
        );
    }, [isLoading, postsError, usersError, posts.data, users.data, handleFetchPosts]);

    return renderedContent;
}