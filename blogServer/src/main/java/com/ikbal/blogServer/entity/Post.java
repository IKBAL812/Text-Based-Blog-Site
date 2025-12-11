package com.ikbal.blogServer.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//post entity for the database
@Data
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    private String name;

    private String content;

    private String author;

    private Long authorId;

    private String date;

    private String editDate;

}
