package com.bitsandbyte.home.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {
//	public final String UPLOAD_DIR = "C:\\Users\\vishal.bharti\\OneDrive - HCL Technologies Ltd\\Desktop\\Bites&Bytes\\Bites&BytesBackend\\src\\main\\resources\\static\\image";
	public final String UPLOAD_DIR = new ClassPathResource("static/image").getFile().getAbsolutePath();

	public FileUploadHelper() throws IOException {
	}

	public boolean uploadFile(MultipartFile file) {
		boolean flag = false;
		try {
//        		 InputStream inputStream =  file.getInputStream();
//        		 byte data[] = new byte[inputStream.available()];
//        		 inputStream.read(data);
//        		 
//        		 FileOutputStream fileOutputStream = new FileOutputStream(UPLOAD_DIR+File.separator+file.getOriginalFilename());
//        		 fileOutputStream.write(data);
//        		 fileOutputStream.flush();
//        		 fileOutputStream.close();

			Files.copy(file.getInputStream(), Paths.get(UPLOAD_DIR + File.separator + file.getOriginalFilename()),
					StandardCopyOption.REPLACE_EXISTING);
			flag = true;
		} catch (Exception e) {
			e.getStackTrace();
		}
		return flag;
	}

}
