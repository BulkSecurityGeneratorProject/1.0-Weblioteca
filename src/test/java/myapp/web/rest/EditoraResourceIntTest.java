package myapp.web.rest;

import myapp.WebliotecaApp;

import myapp.domain.Editora;
import myapp.repository.EditoraRepository;
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
 * Test class for the EditoraResource REST controller.
 *
 * @see EditoraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WebliotecaApp.class)
public class EditoraResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private EditoraRepository editoraRepository;

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

    private MockMvc restEditoraMockMvc;

    private Editora editora;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EditoraResource editoraResource = new EditoraResource(editoraRepository);
        this.restEditoraMockMvc = MockMvcBuilders.standaloneSetup(editoraResource)
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
    public static Editora createEntity(EntityManager em) {
        Editora editora = new Editora()
            .nome(DEFAULT_NOME);
        return editora;
    }

    @Before
    public void initTest() {
        editora = createEntity(em);
    }

    @Test
    @Transactional
    public void createEditora() throws Exception {
        int databaseSizeBeforeCreate = editoraRepository.findAll().size();

        // Create the Editora
        restEditoraMockMvc.perform(post("/api/editoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editora)))
            .andExpect(status().isCreated());

        // Validate the Editora in the database
        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeCreate + 1);
        Editora testEditora = editoraList.get(editoraList.size() - 1);
        assertThat(testEditora.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createEditoraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = editoraRepository.findAll().size();

        // Create the Editora with an existing ID
        editora.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEditoraMockMvc.perform(post("/api/editoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editora)))
            .andExpect(status().isBadRequest());

        // Validate the Editora in the database
        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = editoraRepository.findAll().size();
        // set the field null
        editora.setNome(null);

        // Create the Editora, which fails.

        restEditoraMockMvc.perform(post("/api/editoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editora)))
            .andExpect(status().isBadRequest());

        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEditoras() throws Exception {
        // Initialize the database
        editoraRepository.saveAndFlush(editora);

        // Get all the editoraList
        restEditoraMockMvc.perform(get("/api/editoras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(editora.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getEditora() throws Exception {
        // Initialize the database
        editoraRepository.saveAndFlush(editora);

        // Get the editora
        restEditoraMockMvc.perform(get("/api/editoras/{id}", editora.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(editora.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEditora() throws Exception {
        // Get the editora
        restEditoraMockMvc.perform(get("/api/editoras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEditora() throws Exception {
        // Initialize the database
        editoraRepository.saveAndFlush(editora);

        int databaseSizeBeforeUpdate = editoraRepository.findAll().size();

        // Update the editora
        Editora updatedEditora = editoraRepository.findById(editora.getId()).get();
        // Disconnect from session so that the updates on updatedEditora are not directly saved in db
        em.detach(updatedEditora);
        updatedEditora
            .nome(UPDATED_NOME);

        restEditoraMockMvc.perform(put("/api/editoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEditora)))
            .andExpect(status().isOk());

        // Validate the Editora in the database
        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeUpdate);
        Editora testEditora = editoraList.get(editoraList.size() - 1);
        assertThat(testEditora.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingEditora() throws Exception {
        int databaseSizeBeforeUpdate = editoraRepository.findAll().size();

        // Create the Editora

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEditoraMockMvc.perform(put("/api/editoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(editora)))
            .andExpect(status().isBadRequest());

        // Validate the Editora in the database
        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEditora() throws Exception {
        // Initialize the database
        editoraRepository.saveAndFlush(editora);

        int databaseSizeBeforeDelete = editoraRepository.findAll().size();

        // Delete the editora
        restEditoraMockMvc.perform(delete("/api/editoras/{id}", editora.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Editora> editoraList = editoraRepository.findAll();
        assertThat(editoraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Editora.class);
        Editora editora1 = new Editora();
        editora1.setId(1L);
        Editora editora2 = new Editora();
        editora2.setId(editora1.getId());
        assertThat(editora1).isEqualTo(editora2);
        editora2.setId(2L);
        assertThat(editora1).isNotEqualTo(editora2);
        editora1.setId(null);
        assertThat(editora1).isNotEqualTo(editora2);
    }
}
