package myapp.web.rest;

import myapp.WebliotecaApp;

import myapp.domain.Exemplar;
import myapp.repository.ExemplarRepository;
import myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ExemplarResource REST controller.
 *
 * @see ExemplarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WebliotecaApp.class)
public class ExemplarResourceIntTest {

    private static final Boolean DEFAULT_EMPRESTADO = false;
    private static final Boolean UPDATED_EMPRESTADO = true;

    private static final Boolean DEFAULT_RESERVADO = false;
    private static final Boolean UPDATED_RESERVADO = true;

    @Autowired
    private ExemplarRepository exemplarRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restExemplarMockMvc;

    private Exemplar exemplar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExemplarResource exemplarResource = new ExemplarResource(exemplarRepository);
        this.restExemplarMockMvc = MockMvcBuilders.standaloneSetup(exemplarResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exemplar createEntity(EntityManager em) {
        Exemplar exemplar = new Exemplar()
            .emprestado(DEFAULT_EMPRESTADO)
            .reservado(DEFAULT_RESERVADO);
        return exemplar;
    }

    @Before
    public void initTest() {
        exemplar = createEntity(em);
    }

    @Test
    @Transactional
    public void createExemplar() throws Exception {
        int databaseSizeBeforeCreate = exemplarRepository.findAll().size();

        // Create the Exemplar
        restExemplarMockMvc.perform(post("/api/exemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exemplar)))
            .andExpect(status().isCreated());

        // Validate the Exemplar in the database
        List<Exemplar> exemplarList = exemplarRepository.findAll();
        assertThat(exemplarList).hasSize(databaseSizeBeforeCreate + 1);
        Exemplar testExemplar = exemplarList.get(exemplarList.size() - 1);
        assertThat(testExemplar.isEmprestado()).isEqualTo(DEFAULT_EMPRESTADO);
        assertThat(testExemplar.isReservado()).isEqualTo(DEFAULT_RESERVADO);
    }

    @Test
    @Transactional
    public void createExemplarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exemplarRepository.findAll().size();

        // Create the Exemplar with an existing ID
        exemplar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExemplarMockMvc.perform(post("/api/exemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exemplar)))
            .andExpect(status().isBadRequest());

        // Validate the Exemplar in the database
        List<Exemplar> exemplarList = exemplarRepository.findAll();
        assertThat(exemplarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllExemplars() throws Exception {
        // Initialize the database
        exemplarRepository.saveAndFlush(exemplar);

        // Get all the exemplarList
        restExemplarMockMvc.perform(get("/api/exemplars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exemplar.getId().intValue())))
            .andExpect(jsonPath("$.[*].emprestado").value(hasItem(DEFAULT_EMPRESTADO.booleanValue())))
            .andExpect(jsonPath("$.[*].reservado").value(hasItem(DEFAULT_RESERVADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getExemplar() throws Exception {
        // Initialize the database
        exemplarRepository.saveAndFlush(exemplar);

        // Get the exemplar
        restExemplarMockMvc.perform(get("/api/exemplars/{id}", exemplar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exemplar.getId().intValue()))
            .andExpect(jsonPath("$.emprestado").value(DEFAULT_EMPRESTADO.booleanValue()))
            .andExpect(jsonPath("$.reservado").value(DEFAULT_RESERVADO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExemplar() throws Exception {
        // Get the exemplar
        restExemplarMockMvc.perform(get("/api/exemplars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExemplar() throws Exception {
        // Initialize the database
        exemplarRepository.saveAndFlush(exemplar);

        int databaseSizeBeforeUpdate = exemplarRepository.findAll().size();

        // Update the exemplar
        Exemplar updatedExemplar = exemplarRepository.findById(exemplar.getId()).get();
        // Disconnect from session so that the updates on updatedExemplar are not directly saved in db
        em.detach(updatedExemplar);
        updatedExemplar
            .emprestado(UPDATED_EMPRESTADO)
            .reservado(UPDATED_RESERVADO);

        restExemplarMockMvc.perform(put("/api/exemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExemplar)))
            .andExpect(status().isOk());

        // Validate the Exemplar in the database
        List<Exemplar> exemplarList = exemplarRepository.findAll();
        assertThat(exemplarList).hasSize(databaseSizeBeforeUpdate);
        Exemplar testExemplar = exemplarList.get(exemplarList.size() - 1);
        assertThat(testExemplar.isEmprestado()).isEqualTo(UPDATED_EMPRESTADO);
        assertThat(testExemplar.isReservado()).isEqualTo(UPDATED_RESERVADO);
    }

    @Test
    @Transactional
    public void updateNonExistingExemplar() throws Exception {
        int databaseSizeBeforeUpdate = exemplarRepository.findAll().size();

        // Create the Exemplar

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExemplarMockMvc.perform(put("/api/exemplars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exemplar)))
            .andExpect(status().isBadRequest());

        // Validate the Exemplar in the database
        List<Exemplar> exemplarList = exemplarRepository.findAll();
        assertThat(exemplarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExemplar() throws Exception {
        // Initialize the database
        exemplarRepository.saveAndFlush(exemplar);

        int databaseSizeBeforeDelete = exemplarRepository.findAll().size();

        // Delete the exemplar
        restExemplarMockMvc.perform(delete("/api/exemplars/{id}", exemplar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Exemplar> exemplarList = exemplarRepository.findAll();
        assertThat(exemplarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exemplar.class);
        Exemplar exemplar1 = new Exemplar();
        exemplar1.setId(1L);
        Exemplar exemplar2 = new Exemplar();
        exemplar2.setId(exemplar1.getId());
        assertThat(exemplar1).isEqualTo(exemplar2);
        exemplar2.setId(2L);
        assertThat(exemplar1).isNotEqualTo(exemplar2);
        exemplar1.setId(null);
        assertThat(exemplar1).isNotEqualTo(exemplar2);
    }
}
