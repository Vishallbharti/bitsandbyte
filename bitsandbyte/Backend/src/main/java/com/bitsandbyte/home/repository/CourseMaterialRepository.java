package com.bitsandbyte.home.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.CourseMaterial;

import java.util.List;

@Repository
public interface CourseMaterialRepository extends CrudRepository<CourseMaterial, Integer>{
 List<CourseMaterial> findByCourseId(int id);

 public boolean deleteByAttachmentId(int attachmentId);

 CourseMaterial findByAttachmentId(int attachmentId);

}
