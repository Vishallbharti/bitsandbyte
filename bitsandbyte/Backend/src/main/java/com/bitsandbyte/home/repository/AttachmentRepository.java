package com.bitsandbyte.home.repository;


import com.bitsandbyte.home.model.Attachment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface AttachmentRepository extends CrudRepository<Attachment, Integer> {
}

