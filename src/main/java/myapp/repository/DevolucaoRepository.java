package myapp.repository;

import myapp.domain.Devolucao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Devolucao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DevolucaoRepository extends JpaRepository<Devolucao, Long> {

    @Query("select devolucao from Devolucao devolucao where devolucao.user.login = ?#{principal.username}")
    List<Devolucao> findByUserIsCurrentUser();

}
