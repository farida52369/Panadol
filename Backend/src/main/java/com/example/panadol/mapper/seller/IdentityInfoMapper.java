package com.example.panadol.mapper.seller;

import com.example.panadol.dto.auth.seller.IdentityInfoRequest;
import com.example.panadol.model.auth.seller.IdentityInfo;
import com.example.panadol.model.auth.seller.NationalId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IdentityInfoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "nationalID", source = "nationalId")
    @Mapping(target = "firstName", source = "identityInfoRequest.firstName")
    @Mapping(target = "middleName", source = "identityInfoRequest.middleName")
    @Mapping(target = "lastName", source = "identityInfoRequest.lastName")
    @Mapping(target = "dateOfBirth", source = "identityInfoRequest.dateOfBirth")
    IdentityInfo map(IdentityInfoRequest identityInfoRequest, NationalId nationalId);
}
