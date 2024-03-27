package com.moneygang.finfarm.domain.member.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class MemberProfileRequest {
    private MultipartFile file;
}
