package com.ikbal.blogServer.service;

import com.ikbal.blogServer.entity.Post;

import java.util.List;

public interface PostService {

    Post savePost(Post post);

    List<Post> getAllPosts();

    Post getPostById(Long postId);

    Post updatePost(Long postId,Post postDetails);

    void deletePost(Long postId);
}
