package pl.jakub.pawlak.api.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.jakub.pawlak.api.core.contractor.Contractor;

import java.util.UUID;

public interface ContractorRepository extends JpaRepository<Contractor, UUID> {
    @Query(value = "SELECT COUNT(*) > 0 " +
            "FROM contractors " +
            "WHERE name = :fieldName",
            nativeQuery = true)
    boolean existsByName(@Param("fieldName") String fieldName);
}
