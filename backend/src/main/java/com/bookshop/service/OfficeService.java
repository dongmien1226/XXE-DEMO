package com.bookshop.service;

import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class OfficeService {
    public String processExcel(InputStream is) throws Exception {
        Workbook workbook = WorkbookFactory.create(is);
        Sheet sheet = workbook.getSheetAt(0);
        return "Processed sheet with name: " + sheet.getSheetName();
    }
}
