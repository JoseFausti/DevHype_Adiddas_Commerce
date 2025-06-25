package com.example.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Archivo vacío");
        }
    
        System.out.println("Nombre: " + file.getOriginalFilename());
        System.out.println("Tipo MIME: " + file.getContentType());
    
        try {
            Map result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "auto"
            ));
            return result.get("secure_url").toString();
        } catch (Exception e) {
            System.err.println("Cloudinary ERROR: ");
            e.printStackTrace();  // Esto mostrará si es un 403 exacto desde su API
            throw e;
        }
    }    
}
