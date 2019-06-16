package myapp.web.rest;
import myapp.domain.Emprestimo;
import myapp.repository.EmprestimoRepository;
import myapp.web.rest.errors.BadRequestAlertException;
import myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Emprestimo.
 */
@RestController
@RequestMapping("/api")
public class EmprestimoResource {

    private final Logger log = LoggerFactory.getLogger(EmprestimoResource.class);

    private static final String ENTITY_NAME = "emprestimo";

    private final EmprestimoRepository emprestimoRepository;

    public EmprestimoResource(EmprestimoRepository emprestimoRepository) {
        this.emprestimoRepository = emprestimoRepository;
    }

    /**
     * POST  /emprestimos : Create a new emprestimo.
     *
     * @param emprestimo the emprestimo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emprestimo, or with status 400 (Bad Request) if the emprestimo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emprestimos")
    public ResponseEntity<Emprestimo> createEmprestimo(@Valid @RequestBody Emprestimo emprestimo) throws URISyntaxException {
        log.debug("REST request to save Emprestimo : {}", emprestimo);
        if (emprestimo.getId() != null) {
            throw new BadRequestAlertException("A new emprestimo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emprestimo result = emprestimoRepository.save(emprestimo);
        return ResponseEntity.created(new URI("/api/emprestimos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emprestimos : Updates an existing emprestimo.
     *
     * @param emprestimo the emprestimo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emprestimo,
     * or with status 400 (Bad Request) if the emprestimo is not valid,
     * or with status 500 (Internal Server Error) if the emprestimo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emprestimos")
    public ResponseEntity<Emprestimo> updateEmprestimo(@Valid @RequestBody Emprestimo emprestimo) throws URISyntaxException {
        log.debug("REST request to update Emprestimo : {}", emprestimo);
        if (emprestimo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Emprestimo result = emprestimoRepository.save(emprestimo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emprestimo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emprestimos : get all the emprestimos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emprestimos in body
     */
    @GetMapping("/emprestimos")
    public List<Emprestimo> getAllEmprestimos() {
        log.debug("REST request to get all Emprestimos");
        return emprestimoRepository.findAll();
    }

    /**
     * GET  /emprestimos/:id : get the "id" emprestimo.
     *
     * @param id the id of the emprestimo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emprestimo, or with status 404 (Not Found)
     */
    @GetMapping("/emprestimos/{id}")
    public ResponseEntity<Emprestimo> getEmprestimo(@PathVariable Long id) {
        log.debug("REST request to get Emprestimo : {}", id);
        Optional<Emprestimo> emprestimo = emprestimoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(emprestimo);
    }

    /**
     * DELETE  /emprestimos/:id : delete the "id" emprestimo.
     *
     * @param id the id of the emprestimo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emprestimos/{id}")
    public ResponseEntity<Void> deleteEmprestimo(@PathVariable Long id) {
        log.debug("REST request to delete Emprestimo : {}", id);
        emprestimoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
