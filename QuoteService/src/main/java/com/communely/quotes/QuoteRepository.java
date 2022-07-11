package com.communely.quotes;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuoteRepository extends MongoRepository<Quote, String> {

    Optional<Quote> findQuoteByYear(int year);

    Optional<Quote> findQuoteByAuthor(Person person);

    Optional<Quote> findQuoteByText(String text);

    String deleteQuoteById(String id);

//    Optional<Quote> findQuote(Quote quote);

    Optional<Quote> findQuoteById(String id);

    List<Quote> findTopByAuthorIsNullOrderByTextAsc(int sampleSize);
//    Optional<List<Quote>> findRandomQuotes(int sampleSize, MongoTemplate mongoTemplate)

}
