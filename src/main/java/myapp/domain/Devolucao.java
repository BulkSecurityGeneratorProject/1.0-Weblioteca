package myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Devolucao.
 */
@Entity
@Table(name = "devolucao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Devolucao implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "data_devolucao", nullable = false)
    private LocalDate dataDevolucao;

    @OneToOne
    @JoinColumn(unique = true)
    private Exemplar exemplar;

    @ManyToOne
    @JsonIgnoreProperties("devolucaos")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public Devolucao dataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
        return this;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public Exemplar getExemplar() {
        return exemplar;
    }

    public Devolucao exemplar(Exemplar exemplar) {
        this.exemplar = exemplar;
        return this;
    }

    public void setExemplar(Exemplar exemplar) {
        this.exemplar = exemplar;
    }

    public User getUser() {
        return user;
    }

    public Devolucao user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Devolucao devolucao = (Devolucao) o;
        if (devolucao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), devolucao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Devolucao{" +
            "id=" + getId() +
            ", dataDevolucao='" + getDataDevolucao() + "'" +
            "}";
    }
}
