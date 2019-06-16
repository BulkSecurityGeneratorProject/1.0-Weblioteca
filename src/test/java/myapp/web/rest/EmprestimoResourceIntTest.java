package myapp.web.rest;

import myapp.WebliotecaApp;

import myapp.domain.Emprestimo;
import myapp.repository.EmprestimoRepository;
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
 * Test class for the EmprestimoResource REST controller.
 *
 * @see EmprestimoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WebliotecaApp.class)
public class EmprestimoResourceIntTest {

    private static final LocalDate DEFAULT_DATA_EMPRESTIMO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_EMPRESTIMO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EmprestimoRepository emprestimoRepository;

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

    private MockMvc restEmprestimoMockMvc;

    private Emprestimo emprestimo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmprestimoResource emprestimoResource = new EmprestimoResource(emprestimoRepository);
        this.restEmprestimoMockMvc = MockMvcBuilders.standaloneSetup(emprestimoResource)
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
    public static Emprestimo createEntity(EntityManager em) {
        Emprestimo emprestimo = new Emprestimo()
            .dataEmprestimo(DEFAULT_DATA_EMPRESTIMO);
        return emprestimo;
    }

    @Before
    public void initTest() {
        emprestimo = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmprestimo() throws Exception {
        int databaseSizeBeforeCreate = emprestimoRepository.findAll().size();

        // Create the Emprestimo
        restEmprestimoMockMvc.perform(post("/api/emprestimos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emprestimo)))
            .andExpect(status().isCreated());

        // Validate the Emprestimo in the database
        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeCreate + 1);
        Emprestimo testEmprestimo = emprestimoList.get(emprestimoList.size() - 1);
        assertThat(testEmprestimo.getDataEmprestimo()).isEqualTo(DEFAULT_DATA_EMPRESTIMO);
    }

    @Test
    @Transactional
    public void createEmprestimoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emprestimoRepository.findAll().size();

        // Create the Emprestimo with an existing ID
        emprestimo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmprestimoMockMvc.perform(post("/api/emprestimos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emprestimo)))
            .andExpect(status().isBadRequest());

        // Validate the Emprestimo in the database
        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDataEmprestimoIsRequired() throws Exception {
        int databaseSizeBeforeTest = emprestimoRepository.findAll().size();
        // set the field null
        emprestimo.setDataEmprestimo(null);

        // Create the Emprestimo, which fails.

        restEmprestimoMockMvc.perform(post("/api/emprestimos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emprestimo)))
            .andExpect(status().isBadRequest());

        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmprestimos() throws Exception {
        // Initialize the database
        emprestimoRepository.saveAndFlush(emprestimo);

        // Get all the emprestimoList
        restEmprestimoMockMvc.perform(get("/api/emprestimos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emprestimo.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataEmprestimo").value(hasItem(DEFAULT_DATA_EMPRESTIMO.toString())));
    }
    
    @Test
    @Transactional
    public void getEmprestimo() throws Exception {
        // Initialize the database
        emprestimoRepository.saveAndFlush(emprestimo);

        // Get the emprestimo
        restEmprestimoMockMvc.perform(get("/api/emprestimos/{id}", emprestimo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emprestimo.getId().intValue()))
            .andExpect(jsonPath("$.dataEmprestimo").value(DEFAULT_DATA_EMPRESTIMO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmprestimo() throws Exception {
        // Get the emprestimo
        restEmprestimoMockMvc.perform(get("/api/emprestimos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmprestimo() throws Exception {
        // Initialize the database
        emprestimoRepository.saveAndFlush(emprestimo);

        int databaseSizeBeforeUpdate = emprestimoRepository.findAll().size();

        // Update the emprestimo
        Emprestimo updatedEmprestimo = emprestimoRepository.findById(emprestimo.getId()).get();
        // Disconnect from session so that the updates on updatedEmprestimo are not directly saved in db
        em.detach(updatedEmprestimo);
        updatedEmprestimo
            .dataEmprestimo(UPDATED_DATA_EMPRESTIMO);

        restEmprestimoMockMvc.perform(put("/api/emprestimos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmprestimo)))
            .andExpect(status().isOk());

        // Validate the Emprestimo in the database
        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeUpdate);
        Emprestimo testEmprestimo = emprestimoList.get(emprestimoList.size() - 1);
        assertThat(testEmprestimo.getDataEmprestimo()).isEqualTo(UPDATED_DATA_EMPRESTIMO);
    }

    @Test
    @Transactional
    public void updateNonExistingEmprestimo() throws Exception {
        int databaseSizeBeforeUpdate = emprestimoRepository.findAll().size();

        // Create the Emprestimo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmprestimoMockMvc.perform(put("/api/emprestimos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emprestimo)))
            .andExpect(status().isBadRequest());

        // Validate the Emprestimo in the database
        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmprestimo() throws Exception {
        // Initialize the database
        emprestimoRepository.saveAndFlush(emprestimo);

        int databaseSizeBeforeDelete = emprestimoRepository.findAll().size();

        // Delete the emprestimo
        restEmprestimoMockMvc.perform(delete("/api/emprestimos/{id}", emprestimo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Emprestimo> emprestimoList = emprestimoRepository.findAll();
        assertThat(emprestimoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Emprestimo.class);
        Emprestimo emprestimo1 = new Emprestimo();
        emprestimo1.setId(1L);
        Emprestimo emprestimo2 = new Emprestimo();
        emprestimo2.setId(emprestimo1.getId());
        assertThat(emprestimo1).isEqualTo(emprestimo2);
        emprestimo2.setId(2L);
        assertThat(emprestimo1).isNotEqualTo(emprestimo2);
        emprestimo1.setId(null);
        assertThat(emprestimo1).isNotEqualTo(emprestimo2);
    }
}
