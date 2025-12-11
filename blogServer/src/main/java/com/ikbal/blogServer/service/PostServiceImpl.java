package com.ikbal.blogServer.service;

import com.ikbal.blogServer.entity.Post;
import com.ikbal.blogServer.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;


    public Post savePost(Post post) {
        post.setDate(String.valueOf(new Date()));
        post.setEditDate("null");
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(String postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isPresent()) {
            Post post = optionalPost.get();
            return postRepository.save(post);
        }else{
            throw new EntityNotFoundException("Post Not Found");
        }
    }
    public Post updatePost(String postId,Post postDetails) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id " + postId));
        post.setName(postDetails.getName());
        post.setContent(postDetails.getContent());
        post.setAuthor(postDetails.getAuthor());
        post.setDate(String.valueOf(postDetails.getDate()));
        post.setEditDate(String.valueOf(new Date()));

        return postRepository.save(post);
    }

    public void deletePost(String postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isPresent()) {
            Post post = optionalPost.get();
            postRepository.delete(post);
        }else{
            throw new EntityNotFoundException("Post Not Found");
        }
    }
}
