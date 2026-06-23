package org.example.orchidmanagement.repositories;

import java.util.Optional;

import org.example.orchidmanagement.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
    
    Optional<Orchid>findByOrchidCategory(String orchidCategory);
    Optional<Orchid>findByOrchidNameContainingIgnoreCase(String orchidName);

    Optional<Orchid>findByIsNatural(String isNatural);
    Optional<Orchid>findByIsAttractive(String isAttractive);
}