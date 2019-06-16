package myapp.repository;

import myapp.domain.Reserva;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Reserva entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("select reserva from Reserva reserva where reserva.user.login = ?#{principal.username}")
    List<Reserva> findByUserIsCurrentUser();

}
