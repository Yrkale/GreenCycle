package com.greencycle.Domain.LiveContributor.Repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.greencycle.Domain.LiveContributor.Model.LiveContributor;

@Repository
public interface LiveContributorRepository extends JpaRepository<LiveContributor, Long> {
	
	List<LiveContributor> findAllByOrderByTimeDesc();

}
