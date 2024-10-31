package com.ikbal.blogServer.entity;


import jakarta.persistence.*;
import lombok.Data;

//post entity for the database
@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 5000)
    private String content;

    private String author;

    private Long authorId;

    private String date;

    private String editDate;

}
