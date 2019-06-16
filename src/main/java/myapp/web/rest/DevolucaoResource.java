package myapp.web.rest;
import myapp.domain.Devolucao;
import myapp.repository.DevolucaoRepository;
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
 * REST controller for managing Devolucao.
 */
@RestController
@RequestMapping("/api")
public class DevolucaoResource {

    private final Logger log = LoggerFactory.getLogger(DevolucaoResource.class);

    private static final String ENTITY_NAME = "devolucao";

    private final DevolucaoRepository devolucaoRepository;

    public DevolucaoResource(DevolucaoRepository devolucaoRepository) {
        this.devolucaoRepository = devolucaoRepository;
    }

    /**
     * POST  /devolucaos : Create a new devolucao.
     *
     * @param devolucao the devolucao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new devolucao, or with status 400 (Bad Request) if the devolucao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/devolucaos")
    public ResponseEntity<Devolucao> createDevolucao(@Valid @RequestBody Devolucao devolucao) throws URISyntaxException {
        log.debug("REST request to save Devolucao : {}", devolucao);
        if (devolucao.getId() != null) {
            throw new BadRequestAlertException("A new devolucao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Devolucao result = devolucaoRepository.save(devolucao);
        return ResponseEntity.created(new URI("/api/devolucaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /devolucaos : Updates an existing devolucao.
     *
     * @param devolucao the devolucao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated devolucao,
     * or with status 400 (Bad Request) if the devolucao is not valid,
     * or with status 500 (Internal Server Error) if the devolucao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/devolucaos")
    public ResponseEntity<Devolucao> updateDevolucao(@Valid @RequestBody Devolucao devolucao) throws URISyntaxException {
        log.debug("REST request to update Devolucao : {}", devolucao);
        if (devolucao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Devolucao result = devolucaoRepository.save(devolucao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, devolucao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /devolucaos : get all the devolucaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of devolucaos in body
     */
    @GetMapping("/devolucaos")
    public List<Devolucao> getAllDevolucaos() {
        log.debug("REST request to get all Devolucaos");
        return devolucaoRepository.findAll();
    }

    /**
     * GET  /devolucaos/:id : get the "id" devolucao.
     *
     * @param id the id of the devolucao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the devolucao, or with status 404 (Not Found)
     */
    @GetMapping("/devolucaos/{id}")
    public ResponseEntity<Devolucao> getDevolucao(@PathVariable Long id) {
        log.debug("REST request to get Devolucao : {}", id);
        Optional<Devolucao> devolucao = devolucaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(devolucao);
    }

    /**
     * DELETE  /devolucaos/:id : delete the "id" devolucao.
     *
     * @param id the id of the devolucao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/devolucaos/{id}")
    public ResponseEntity<Void> deleteDevolucao(@PathVariable Long id) {
        log.debug("REST request to delete Devolucao : {}", id);
        devolucaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
