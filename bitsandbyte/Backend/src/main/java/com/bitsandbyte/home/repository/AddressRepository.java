package com.bitsandbyte.home.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long>{
	
	List<Address> findByStudentId(int id);
	

}
