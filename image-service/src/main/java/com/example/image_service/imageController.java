package com.example.image_service;

import com.example.image_service.exceptions.NotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
public class imageController {
    Path path = Paths.get(System.getProperty("user.home"), "menu-app-images", "images");

    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable("imageName") String imageName) throws MalformedURLException {
        Path filePath = path.resolve(imageName);
        Resource image= new UrlResource(filePath.toUri());
        if (image.exists() || image.isReadable()){
            return new ResponseEntity<>(image, HttpStatus.OK);
        }
        else{
            throw new NotFoundException();
        }
    }
}