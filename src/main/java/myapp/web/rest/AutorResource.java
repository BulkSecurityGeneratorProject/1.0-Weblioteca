package myapp.web.rest;
import myapp.domain.Autor;
import myapp.repository.AutorRepository;
import myapp.web.rest.errors.BadRequestAlertException;
import myapp.web.rest.util.HeaderUtil;
import myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Autor.
 */
@RestController
@RequestMapping("/api")
public class AutorResource {

    private final Logger log = LoggerFactory.getLogger(AutorResource.class);

    private static final String ENTITY_NAME = "autor";

    private final AutorRepository autorRepository;

    public AutorResource(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    /**
     * POST  /autors : Create a new autor.
     *
     * @param autor the autor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new autor, or with status 400 (Bad Request) if the autor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/autors")
    public ResponseEntity<Autor> createAutor(@Valid @RequestBody Autor autor) throws URISyntaxException {
        log.debug("REST request to save Autor : {}", autor);
        if (autor.getId() != null) {
            throw new BadRequestAlertException("A new autor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Autor result = autorRepository.save(autor);
        return ResponseEntity.created(new URI("/api/autors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /autors : Updates an existing autor.
     *
     * @param autor the autor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated autor,
     * or with status 400 (Bad Request) if the autor is not valid,
     * or with status 500 (Internal Server Error) if the autor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/autors")
    public ResponseEntity<Autor> updateAutor(@Valid @RequestBody Autor autor) throws URISyntaxException {
        log.debug("REST request to update Autor : {}", autor);
        if (autor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Autor result = autorRepository.save(autor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, autor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /autors : get all the autors.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of autors in body
     */
    @GetMapping("/autors")
    public ResponseEntity<List<Autor>> getAllAutors(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("livro-is-null".equals(filter)) {
            log.debug("REST request to get all Autors where livro is null");
            return new ResponseEntity<>(StreamSupport
                .stream(autorRepository.findAll().spliterator(), false)
                .filter(autor -> autor.getLivro() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Autors");
        Page<Autor> page = autorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/autors");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /autors/:id : get the "id" autor.
     *
     * @param id the id of the autor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the autor, or with status 404 (Not Found)
     */
    @GetMapping("/autors/{id}")
    public ResponseEntity<Autor> getAutor(@PathVariable Long id) {
        log.debug("REST request to get Autor : {}", id);
        Optional<Autor> autor = autorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autor);
    }

    /**
     * DELETE  /autors/:id : delete the "id" autor.
     *
     * @param id the id of the autor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/autors/{id}")
    public ResponseEntity<Void> deleteAutor(@PathVariable Long id) {
        log.debug("REST request to delete Autor : {}", id);
        autorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
