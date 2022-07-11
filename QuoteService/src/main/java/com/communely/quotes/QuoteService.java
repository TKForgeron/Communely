package com.communely.quotes;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*

We use the CRUD naming scheme for this class.
Create - For adding to DB
Read - For fetching from DB
Update - For updating in DB
Delete - For removing from DB

 */
@AllArgsConstructor
@Service
public class QuoteService {
    private final QuoteRepository quoteRepository;

    public List<Quote> readAllQuotes() {
        return quoteRepository.findAll();
    }

    public String readFirstQuoteId() {
        List<Quote> quotes = this.readAllQuotes();

        return quotes.get(0).getId();
    }

    public List<Quote> readRandomQuotes(int sampleSize) {
//        SampleOperation sampleStage = Aggregation.sample(sampleSize);
//        Aggregation aggregation = Aggregation.newAggregation(sampleStage);
//        AggregationResults<Quote> output = mongoTemplate.aggregate(aggregation, "quotes", Quote.class);
//        List<Quote> randomQuotes = output.getMappedResults();
        List<Quote> randomQuotes = quoteRepository.findTopByAuthorIsNullOrderByTextAsc(sampleSize);
        return randomQuotes;
    }

    public Quote readQuoteById(String id) {
        Optional<Quote> maybeQuote = quoteRepository.findQuoteById(id);
        if (!maybeQuote.isPresent()) {
            throw new IllegalStateException(String.format("QuoteId \"%s\" does not exist!", id));
        }
        return maybeQuote.get();
    }

    public Quote readQuoteByText(String text) {
        Optional<Quote> maybeQuote = quoteRepository.findQuoteByText(text);
        if (!maybeQuote.isPresent()) {
            throw new IllegalStateException(String.format("Quote \"%s\" does not exist!", text));
        }
        return maybeQuote.get();
    }

    public Quote deleteQuote(String id, Quote textForVerification) {
        Optional<Quote> maybeQuote = quoteRepository.findById(id);

        if (!maybeQuote.isPresent()) {
            throw new IllegalStateException("quoteId: " + id + "does not exist!");
        }
        Quote quote = maybeQuote.get();

        if (quote.getText().equals(textForVerification.getText())) {
            quoteRepository.deleteQuoteById(id);
        } else {
            throw new IllegalStateException("You are not authorized to delete. Please give the quote text for verification.");
        }
        return quote;
    }

    public Quote updateQuote(Quote quoteToBe) {
        String id = quoteToBe.getId();
        Optional<Quote> maybeQuote = quoteRepository.findQuoteById(id);

        if (!maybeQuote.isPresent()) {
            throw new IllegalStateException(String.format("QuoteId: %s does not exist!", id));
        }
        quoteRepository.save(quoteToBe);

        return quoteToBe;
    }

    public Quote createQuote(Quote quote) {
        String text = quote.getText();
        Optional<Quote> quoteOptional = quoteRepository.findQuoteByText(text);
        Boolean quotePresent = quoteOptional.isPresent();

        if (quotePresent) {
            throw new IllegalStateException(String.format("Quote \"%s\" already exists!", text));
        }
        quoteRepository.save(quote);

        return quote;
    }
}
