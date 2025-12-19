package com.bookshop.controller;

import com.bookshop.service.OfficeService;
import com.bookshop.service.PdfService;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/docs")
public class DocumentController {
    @Autowired private PdfService pdfService;
    @Autowired private OfficeService officeService;

    @PostMapping("/generate-pdf")
    public byte[] createPdf(@RequestBody String htmlTemplate) {
        return pdfService.generatePdfFromHtml(htmlTemplate);
    }

    @PostMapping("/upload-excel")
    public String uploadExcel(@RequestParam("file") MultipartFile file) throws Exception {
        return officeService.processExcel(file.getInputStream());
    }

    @PostMapping("/tika-scan")
    public String tikaScan(@RequestParam("file") MultipartFile file) {
        try {
            File tempFile = File.createTempFile("upload-", ".tmp");
            file.transferTo(tempFile);

            Tika tika = new Tika(); // Create a Tika Object
            String content = tika.parseToString(tempFile);

            tempFile.delete(); // Cleanup
            return "Tika extracted: " + content;
        } catch (Exception e) {
            return "Tika Error: " + e.getMessage();
        }
    }
}
