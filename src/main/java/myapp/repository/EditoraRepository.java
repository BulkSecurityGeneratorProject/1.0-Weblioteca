package myapp.repository;

import myapp.domain.Editora;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Editora entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EditoraRepository extends JpaRepository<Editora, Long> {

}
