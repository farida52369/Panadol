package com.example.panadol.exception;

public final class PanadolException extends RuntimeException {
    public PanadolException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public PanadolException(String exMessage) {
        super(exMessage);
    }
}