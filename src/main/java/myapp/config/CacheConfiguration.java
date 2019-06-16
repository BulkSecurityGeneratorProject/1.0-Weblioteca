package myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(myapp.domain.Editora.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Editora.class.getName() + ".livros", jcacheConfiguration);
            cm.createCache(myapp.domain.Exemplar.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Livro.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Livro.class.getName() + ".exemplars", jcacheConfiguration);
            cm.createCache(myapp.domain.Emprestimo.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Reserva.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Autor.class.getName(), jcacheConfiguration);
            cm.createCache(myapp.domain.Autor.class.getName() + ".livros", jcacheConfiguration);
            cm.createCache(myapp.domain.Devolucao.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
