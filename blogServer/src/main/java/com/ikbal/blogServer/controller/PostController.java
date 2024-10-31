package com.ikbal.blogServer.controller;

import com.ikbal.blogServer.entity.Customer;
import com.ikbal.blogServer.entity.Post;
import com.ikbal.blogServer.service.PostService;
import com.ikbal.blogServer.service.jwt.CustomerServiceImpl;
import com.ikbal.blogServer.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//post functions (no need to be authenticated to use them since users can look at posts anonymously)
@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        try{
            Post createdPost = postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts()  {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Long postId) {
        try{
            Post post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        }catch( EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable Long postId, @RequestBody Post post, @RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(jwtToken);
            Customer customer = customerService.getUserByEmail(email);

            Post existingPost = postService.getPostById(postId);
            if (!existingPost.getAuthorId().equals(customer.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not authorized to update this post");
            }

            Post updatedPost = postService.updatePost(postId, post);
            return ResponseEntity.ok(updatedPost);

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId, @RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(jwtToken);
            Customer customer = customerService.getUserByEmail(email);

            Post existingPost = postService.getPostById(postId);
            if (!existingPost.getAuthorId().equals(customer.getId()) && customer.getRole() != "admin") {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You are not authorized to delete this post");
            }

            postService.deletePost(postId);
            return ResponseEntity.ok("Post deleted successfully");

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
