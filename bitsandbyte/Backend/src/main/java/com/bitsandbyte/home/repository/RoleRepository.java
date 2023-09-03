package com.bitsandbyte.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitsandbyte.home.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

}
