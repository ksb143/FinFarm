package com.moneygang.finfarm.domain.member.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MemberProfileRequest {
    private MultipartFile file;
}
