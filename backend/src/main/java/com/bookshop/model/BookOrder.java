package com.bookshop.model;

public class BookOrder {
    private String bookTitle;
    private int quantity;
    private String customerName;

    public BookOrder() {}

    public BookOrder(String bookTitle, int quantity, String customerName) {
        this.bookTitle = bookTitle;
        this.quantity = quantity;
        this.customerName = customerName;
    }

    // Getters and Setters
    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
