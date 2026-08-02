package com.aiinterview.platform.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        // Automatically determine resource type (e.g. image, raw for PDF)
        String resourceType = "auto";
        if (file.getOriginalFilename() != null && file.getOriginalFilename().endsWith(".pdf")) {
            resourceType = "raw"; // raw is needed for non-image assets like PDF in some setups
        }
        
        Map<?, ?> params = ObjectUtils.asMap(
                "folder", folderName,
                "resource_type", resourceType
        );
        
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
        return uploadResult.get("secure_url").toString();
    }
}
