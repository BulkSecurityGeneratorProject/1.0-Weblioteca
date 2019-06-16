package myapp.repository;

import myapp.domain.Exemplar;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Exemplar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExemplarRepository extends JpaRepository<Exemplar, Long> {

}
