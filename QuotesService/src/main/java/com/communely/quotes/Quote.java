package com.communely.quotes;

import lombok.Data;

@Data
public class Quote {
    private String text;
    private Person author;

    public Quote(String text, Person author) {
        this.text = text;
        this.author = author;
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

    
}
