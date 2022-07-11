package com.communely.quotes;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class QuotesApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuotesApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(QuoteRepository repository, MongoTemplate mongoTemplate) {
        return args -> {
            String firstName = "Noah";
            String lastName = "van Bochove";
            String text = "I like trains";
            Person person = new Person(firstName, lastName, Gender.MALE);
            Quote quote = new Quote(text, person, 2022);

            usingMongoTemplateAndQuery(repository, mongoTemplate, text, quote);
        };

    }

    private void usingMongoTemplateAndQuery(QuoteRepository repository, MongoTemplate mongoTemplate, String text, Quote quote) {
        Query query = new Query();
        query.addCriteria(Criteria.where("text").is(text));

        List<Quote> quoteList = mongoTemplate.find(query, Quote.class);

        if (quoteList.size() > 1) {
            String ise = String.format("Found multiple instances of quote: \"%s\"", text);
            throw new IllegalStateException(ise);
        } else if (quoteList.isEmpty()) {
            System.out.println(String.format("Inserting quote %s", quote));
            repository.insert(quote);
        } else {
            System.out.println(String.format("Quote \"%s\" already exists", quote.getText()));
        }
    }
}
