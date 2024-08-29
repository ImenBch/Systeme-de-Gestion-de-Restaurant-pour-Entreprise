package com.example.menu.service.exceptions;

import com.example.menu.service.dtos.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> notFoundExceptionHandler(NotFoundException e){
        ErrorResponse errorResponse= new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        return new ResponseEntity<>(errorResponse,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(AlreadyExistException.class)
    public  ResponseEntity<ErrorResponse> alreadyExistExceptionHandler(AlreadyExistException e){
        ErrorResponse errorResponse= new ErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage());
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(IllegalEvaluationException.class)
    public ResponseEntity<ErrorResponse> illegalEvaluationExceptionHandler(IllegalEvaluationException e){
        ErrorResponse errorResponse= new ErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage());
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> illegalEvaluationExceptionHandler(RuntimeException e){
        ErrorResponse errorResponse= new ErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage());
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
}