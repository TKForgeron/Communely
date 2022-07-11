package com.communely.quotes;

import com.mongodb.client.MongoClient;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*

We use the HTTP-requests naming scheme for this class.
Post - For adding to DB
Get - For fetching from DB
Put - For updating in DB
Delete - For removing from DB

 */

@RestController
@RequestMapping(path = "quote")
@AllArgsConstructor
public class QuoteController {
    private final QuoteService quoteService;

    @GetMapping(path = "/all")
    public List<Quote> getAllQuotes() {
        return quoteService.readAllQuotes();
    }

    @GetMapping(path = "/id")
    public String getQuoteId() {
        return quoteService.readFirstQuoteId();
    }

    @GetMapping(path = "/random/{sampleSize}")
    public List<Quote> getRandomQuote(@PathVariable("sampleSize") int sampleSize) {
        return quoteService.readRandomQuotes(sampleSize);
    }

    @GetMapping(path = "text/{quoteText}")
    public Quote getQuoteByText(@PathVariable("quoteText") String quoteText) {
        return quoteService.readQuoteByText(quoteText);
    }

    @GetMapping(path = "id/{quoteId}")
    public Quote getQuoteById(@PathVariable("quoteId") String quoteId) {
        return quoteService.readQuoteById(quoteId);
    }

    @PostMapping(path = "/add")
    public Quote postQuote(@RequestBody Quote quote) {
        return quoteService.createQuote(quote);
    }

    @PutMapping(path = "/update")
    public Quote putQuote(@RequestBody Quote quote) {
        return quoteService.updateQuote(quote);
    }

    @DeleteMapping(path = "/delete/{quoteId}")
    public Quote deleteQuote(@PathVariable("quoteId") String quoteId, @RequestBody Quote textForVerification) {
        return quoteService.deleteQuote(quoteId, textForVerification);
    }
}
