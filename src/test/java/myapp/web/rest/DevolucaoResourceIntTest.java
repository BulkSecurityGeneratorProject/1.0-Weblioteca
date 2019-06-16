package myapp.web.rest;

import myapp.WebliotecaApp;

import myapp.domain.Devolucao;
import myapp.repository.DevolucaoRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DevolucaoResource REST controller.
 *
 * @see DevolucaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WebliotecaApp.class)
public class DevolucaoResourceIntTest {

    private static final LocalDate DEFAULT_DATA_DEVOLUCAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_DEVOLUCAO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DevolucaoRepository devolucaoRepository;

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

    private MockMvc restDevolucaoMockMvc;

    private Devolucao devolucao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DevolucaoResource devolucaoResource = new DevolucaoResource(devolucaoRepository);
        this.restDevolucaoMockMvc = MockMvcBuilders.standaloneSetup(devolucaoResource)
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
    public static Devolucao createEntity(EntityManager em) {
        Devolucao devolucao = new Devolucao()
            .dataDevolucao(DEFAULT_DATA_DEVOLUCAO);
        return devolucao;
    }

    @Before
    public void initTest() {
        devolucao = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevolucao() throws Exception {
        int databaseSizeBeforeCreate = devolucaoRepository.findAll().size();

        // Create the Devolucao
        restDevolucaoMockMvc.perform(post("/api/devolucaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devolucao)))
            .andExpect(status().isCreated());

        // Validate the Devolucao in the database
        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeCreate + 1);
        Devolucao testDevolucao = devolucaoList.get(devolucaoList.size() - 1);
        assertThat(testDevolucao.getDataDevolucao()).isEqualTo(DEFAULT_DATA_DEVOLUCAO);
    }

    @Test
    @Transactional
    public void createDevolucaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = devolucaoRepository.findAll().size();

        // Create the Devolucao with an existing ID
        devolucao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDevolucaoMockMvc.perform(post("/api/devolucaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devolucao)))
            .andExpect(status().isBadRequest());

        // Validate the Devolucao in the database
        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDataDevolucaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = devolucaoRepository.findAll().size();
        // set the field null
        devolucao.setDataDevolucao(null);

        // Create the Devolucao, which fails.

        restDevolucaoMockMvc.perform(post("/api/devolucaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devolucao)))
            .andExpect(status().isBadRequest());

        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDevolucaos() throws Exception {
        // Initialize the database
        devolucaoRepository.saveAndFlush(devolucao);

        // Get all the devolucaoList
        restDevolucaoMockMvc.perform(get("/api/devolucaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devolucao.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataDevolucao").value(hasItem(DEFAULT_DATA_DEVOLUCAO.toString())));
    }
    
    @Test
    @Transactional
    public void getDevolucao() throws Exception {
        // Initialize the database
        devolucaoRepository.saveAndFlush(devolucao);

        // Get the devolucao
        restDevolucaoMockMvc.perform(get("/api/devolucaos/{id}", devolucao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(devolucao.getId().intValue()))
            .andExpect(jsonPath("$.dataDevolucao").value(DEFAULT_DATA_DEVOLUCAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDevolucao() throws Exception {
        // Get the devolucao
        restDevolucaoMockMvc.perform(get("/api/devolucaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevolucao() throws Exception {
        // Initialize the database
        devolucaoRepository.saveAndFlush(devolucao);

        int databaseSizeBeforeUpdate = devolucaoRepository.findAll().size();

        // Update the devolucao
        Devolucao updatedDevolucao = devolucaoRepository.findById(devolucao.getId()).get();
        // Disconnect from session so that the updates on updatedDevolucao are not directly saved in db
        em.detach(updatedDevolucao);
        updatedDevolucao
            .dataDevolucao(UPDATED_DATA_DEVOLUCAO);

        restDevolucaoMockMvc.perform(put("/api/devolucaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevolucao)))
            .andExpect(status().isOk());

        // Validate the Devolucao in the database
        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeUpdate);
        Devolucao testDevolucao = devolucaoList.get(devolucaoList.size() - 1);
        assertThat(testDevolucao.getDataDevolucao()).isEqualTo(UPDATED_DATA_DEVOLUCAO);
    }

    @Test
    @Transactional
    public void updateNonExistingDevolucao() throws Exception {
        int databaseSizeBeforeUpdate = devolucaoRepository.findAll().size();

        // Create the Devolucao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDevolucaoMockMvc.perform(put("/api/devolucaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devolucao)))
            .andExpect(status().isBadRequest());

        // Validate the Devolucao in the database
        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDevolucao() throws Exception {
        // Initialize the database
        devolucaoRepository.saveAndFlush(devolucao);

        int databaseSizeBeforeDelete = devolucaoRepository.findAll().size();

        // Delete the devolucao
        restDevolucaoMockMvc.perform(delete("/api/devolucaos/{id}", devolucao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Devolucao> devolucaoList = devolucaoRepository.findAll();
        assertThat(devolucaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Devolucao.class);
        Devolucao devolucao1 = new Devolucao();
        devolucao1.setId(1L);
        Devolucao devolucao2 = new Devolucao();
        devolucao2.setId(devolucao1.getId());
        assertThat(devolucao1).isEqualTo(devolucao2);
        devolucao2.setId(2L);
        assertThat(devolucao1).isNotEqualTo(devolucao2);
        devolucao1.setId(null);
        assertThat(devolucao1).isNotEqualTo(devolucao2);
    }
}
