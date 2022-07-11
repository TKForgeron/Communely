package com.communely.quotes;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Quote {
    @Id
    private String id;
    @Indexed(unique = true)
    private String text;
    private Person author;
    private Integer year;

    public Quote(String text, Person author, Integer year) {
        this.text = text;
        this.author = author;
        this.year = year;
    }

    public Quote(String text) {
        this.text = text;
        this.author = null;
        this.year = null;
    }

    public Quote() {
        this.text = null;
        this.author = null;
        this.year = null;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Person getAuthor() {
        return author;
    }

    public void setAuthor(Person author) {
        this.author = author;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
