package com.moneygang.finfarm.global.base;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.moneygang.finfarm.global.exception.GlobalException;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

@Log4j2
@Data
public class AwsS3ObjectStorage {
    private AmazonS3 amazonS3; //AmazonS3 config 미리 빈 주입
    private String bucket; //빈 주입 시 setter

    private String aiS3Url; //빈 주입 시 setter

    public AwsS3ObjectStorage(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        // 타임스탬프를 이용해 고유한 파일명 생성
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String uniqueFilename = sdf.format(new Date());

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, uniqueFilename, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, uniqueFilename).toString();
    }

    public int deleteFile(String fileUrl)  {
        try {
            // URL에서 객체 키 추출
            URL url = new URL(fileUrl);
            // URL의 첫 번째 '/'를 제거하여 객체 키 얻기
            String key = url.getPath().substring(1);

            // 파일 존재 여부 확인
            if (amazonS3.doesObjectExist(bucket, key)) {
                // S3에서 파일 삭제
                amazonS3.deleteObject(bucket, key);
                log.info("File deleted successfully: {}", key);
                return 1;
            } else { // file not found
                log.warn("File not found: {}", key);
                throw new GlobalException(HttpStatus.NOT_FOUND, "파일이 존재하지 않습니다.");
            }
        } catch (Exception e) { //error
            log.error("Failed to delete file!: {}", fileUrl, e);
            throw new GlobalException(HttpStatus.INTERNAL_SERVER_ERROR, "AWS Server Error");
        }
    }
}
