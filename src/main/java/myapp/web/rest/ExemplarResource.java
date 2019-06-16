package myapp.web.rest;
import myapp.domain.Exemplar;
import myapp.repository.ExemplarRepository;
import myapp.web.rest.errors.BadRequestAlertException;
import myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Exemplar.
 */
@RestController
@RequestMapping("/api")
public class ExemplarResource {

    private final Logger log = LoggerFactory.getLogger(ExemplarResource.class);

    private static final String ENTITY_NAME = "exemplar";

    private final ExemplarRepository exemplarRepository;

    public ExemplarResource(ExemplarRepository exemplarRepository) {
        this.exemplarRepository = exemplarRepository;
    }

    /**
     * POST  /exemplars : Create a new exemplar.
     *
     * @param exemplar the exemplar to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exemplar, or with status 400 (Bad Request) if the exemplar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exemplars")
    public ResponseEntity<Exemplar> createExemplar(@RequestBody Exemplar exemplar) throws URISyntaxException {
        log.debug("REST request to save Exemplar : {}", exemplar);
        if (exemplar.getId() != null) {
            throw new BadRequestAlertException("A new exemplar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Exemplar result = exemplarRepository.save(exemplar);
        return ResponseEntity.created(new URI("/api/exemplars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exemplars : Updates an existing exemplar.
     *
     * @param exemplar the exemplar to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exemplar,
     * or with status 400 (Bad Request) if the exemplar is not valid,
     * or with status 500 (Internal Server Error) if the exemplar couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exemplars")
    public ResponseEntity<Exemplar> updateExemplar(@RequestBody Exemplar exemplar) throws URISyntaxException {
        log.debug("REST request to update Exemplar : {}", exemplar);
        if (exemplar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Exemplar result = exemplarRepository.save(exemplar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exemplar.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exemplars : get all the exemplars.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of exemplars in body
     */
    @GetMapping("/exemplars")
    public List<Exemplar> getAllExemplars(@RequestParam(required = false) String filter) {
        if ("emprestimo-is-null".equals(filter)) {
            log.debug("REST request to get all Exemplars where emprestimo is null");
            return StreamSupport
                .stream(exemplarRepository.findAll().spliterator(), false)
                .filter(exemplar -> exemplar.getEmprestimo() == null)
                .collect(Collectors.toList());
        }
        if ("reserva-is-null".equals(filter)) {
            log.debug("REST request to get all Exemplars where reserva is null");
            return StreamSupport
                .stream(exemplarRepository.findAll().spliterator(), false)
                .filter(exemplar -> exemplar.getReserva() == null)
                .collect(Collectors.toList());
        }
        if ("devolucao-is-null".equals(filter)) {
            log.debug("REST request to get all Exemplars where devolucao is null");
            return StreamSupport
                .stream(exemplarRepository.findAll().spliterator(), false)
                .filter(exemplar -> exemplar.getDevolucao() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Exemplars");
        return exemplarRepository.findAll();
    }

    /**
     * GET  /exemplars/:id : get the "id" exemplar.
     *
     * @param id the id of the exemplar to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exemplar, or with status 404 (Not Found)
     */
    @GetMapping("/exemplars/{id}")
    public ResponseEntity<Exemplar> getExemplar(@PathVariable Long id) {
        log.debug("REST request to get Exemplar : {}", id);
        Optional<Exemplar> exemplar = exemplarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(exemplar);
    }

    /**
     * DELETE  /exemplars/:id : delete the "id" exemplar.
     *
     * @param id the id of the exemplar to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exemplars/{id}")
    public ResponseEntity<Void> deleteExemplar(@PathVariable Long id) {
        log.debug("REST request to delete Exemplar : {}", id);
        exemplarRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
