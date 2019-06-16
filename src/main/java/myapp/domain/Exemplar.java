package myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Exemplar.
 */
@Entity
@Table(name = "exemplar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Exemplar implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "emprestado")
    private Boolean emprestado;

    @Column(name = "reservado")
    private Boolean reservado;

    @ManyToOne
    @JsonIgnoreProperties("exemplars")
    private Livro livro;

    @OneToOne(mappedBy = "exemplar")
    @JsonIgnore
    private Emprestimo emprestimo;

    @OneToOne(mappedBy = "exemplar")
    @JsonIgnore
    private Reserva reserva;

    @OneToOne(mappedBy = "exemplar")
    @JsonIgnore
    private Devolucao devolucao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEmprestado() {
        return emprestado;
    }

    public Exemplar emprestado(Boolean emprestado) {
        this.emprestado = emprestado;
        return this;
    }

    public void setEmprestado(Boolean emprestado) {
        this.emprestado = emprestado;
    }

    public Boolean isReservado() {
        return reservado;
    }

    public Exemplar reservado(Boolean reservado) {
        this.reservado = reservado;
        return this;
    }

    public void setReservado(Boolean reservado) {
        this.reservado = reservado;
    }

    public Livro getLivro() {
        return livro;
    }

    public Exemplar livro(Livro livro) {
        this.livro = livro;
        return this;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public Emprestimo getEmprestimo() {
        return emprestimo;
    }

    public Exemplar emprestimo(Emprestimo emprestimo) {
        this.emprestimo = emprestimo;
        return this;
    }

    public void setEmprestimo(Emprestimo emprestimo) {
        this.emprestimo = emprestimo;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public Exemplar reserva(Reserva reserva) {
        this.reserva = reserva;
        return this;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public Devolucao getDevolucao() {
        return devolucao;
    }

    public Exemplar devolucao(Devolucao devolucao) {
        this.devolucao = devolucao;
        return this;
    }

    public void setDevolucao(Devolucao devolucao) {
        this.devolucao = devolucao;
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
        Exemplar exemplar = (Exemplar) o;
        if (exemplar.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exemplar.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Exemplar{" +
            "id=" + getId() +
            ", emprestado='" + isEmprestado() + "'" +
            ", reservado='" + isReservado() + "'" +
            "}";
    }
}
