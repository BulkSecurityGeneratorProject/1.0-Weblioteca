package myapp.repository;

import myapp.domain.Emprestimo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Emprestimo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    @Query("select emprestimo from Emprestimo emprestimo where emprestimo.user.login = ?#{principal.username}")
    List<Emprestimo> findByUserIsCurrentUser();

}
