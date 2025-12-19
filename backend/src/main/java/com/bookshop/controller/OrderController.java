package com.bookshop.controller;

import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @PostMapping(value="/process", consumes="application/xml", produces="text/plain")
    public String processOrder(@RequestBody String xmlInput) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = dbf.newDocumentBuilder();
            Document doc = builder.parse(new InputSource(new StringReader(xmlInput)));

            // Extract content to show In-band XXE
            String bookTitle = doc.getElementsByTagName("bookTitle").item(0).getTextContent();
            return "Order confirmed for: " + bookTitle;
        } catch (Exception e) {
            return "XML Error: " + e.getMessage();
        }
    }

    @PostMapping(value = "/process-blind", consumes = "application/xml")
    public String processBlindOrder(@RequestBody String xmlInput) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            // Vulnerability: These settings are often 'true' by default in older versions
            dbf.setFeature("http://xml.org/sax/features/external-general-entities", true);
            dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", true);
//            dbf.setFeature("http://xml.org/sax/features/nonvalidating/load-external-dtd", true);

            DocumentBuilder builder = dbf.newDocumentBuilder();
            // The parser will process the DTD and entities here
            builder.parse(new InputSource(new StringReader(xmlInput)));

            // We return a generic message so the attacker doesn't see the data here
            // They must use an OOB technique (like a DTD calling a external server)
            return "Order received for processing.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}