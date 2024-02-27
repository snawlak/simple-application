package pl.jakub.pawlak.api.core.contractor;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pl.jakub.pawlak.api.persistance.ContractorRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContractorServiceTest {

    @InjectMocks
    private ContractorService service;
    @Mock
    private ContractorRepository repository;
    @Mock
    private ModelMapper modelMapper;

    @Test
    void shouldFindAll() {
        // given
        final var allContractors = getContractors();
        when(repository.findAll()).thenReturn(allContractors);
        when(modelMapper.map(any(), any()))
                .thenReturn(new ContractorDto());

        // when
        final var actualContractors = service.findAll();

        // then
        assertNotNull(actualContractors);
        assertEquals(allContractors.size(), actualContractors.size());
    }

    @Test
    void shouldFindById() {
        // given
        final var allContractors = getContractors();
        final var id = UUID.fromString("f9e87bad-b128-49f3-b2b3-9f6f5c247846");
        when(repository.findById(id))
                .thenReturn(Optional.of(allContractors.get(0)));
        when(modelMapper.map(any(), any()))
                .thenReturn(new ContractorDto(id, "name1", "address1", "nip1", "email1@example.org", "phoneNumber1" ));

        // when
        final var actualContractors = service.findById(id);

        // then
        assertNotNull(actualContractors);
        assertEquals(id.toString(), actualContractors.getId().toString());
    }

    @Test
    void shouldThrowExceptionWhenNotFound() {
        // given
        final var id = UUID.fromString("f9e87bad-b128-49f3-b2b3-9f6f5c247846");
        when(repository.findById(id))
                .thenReturn(Optional.empty());

        // when & then
        assertThrows(IllegalArgumentException.class, () -> service.findById(id));
    }

    @Test
    void shouldAdd() {
        // given
        final var reqBody = new ContractorRequestBody("name1", "nip1", "address1", "phoneNumber1", "email1@example.org");
        final var savedContractor = getContractors().get(0);
        savedContractor.setId(null);
        when(repository.save(savedContractor))
                .thenReturn(getContractors().get(0));
        when(modelMapper.map(any(), any()))
                .thenReturn(savedContractor);

        // when
        service.add(reqBody);

        // then
        verify(repository, times(1)).save(savedContractor);
    }

    @Test
    void shouldUpdate() {
        // given
        final var id = UUID.fromString("f9e87bad-b128-49f3-b2b3-9f6f5c247846");
        final var reqBody = new ContractorRequestBody("name2", "nip1", "address1", "phoneNumber1", "email1@example.org");
        final var savedContractor = mock(Contractor.class);
        when(repository.findById(id)).thenReturn(Optional.of(savedContractor));

        // when
        service.update(id, reqBody);

        // then
        verify(savedContractor, times(0)).setId(id);
        verify(savedContractor, times(1)).setName("name2");
        verify(savedContractor, times(1)).setNip("nip1");
        verify(savedContractor, times(1)).setAddress("address1");
        verify(savedContractor, times(1)).setPhoneNumber("phoneNumber1");
        verify(savedContractor, times(1)).setEmail("email1@example.org");
    }

    private List<Contractor> getContractors() {
        return List.of(
                Contractor.builder()
                        .id(UUID.fromString("f9e87bad-b128-49f3-b2b3-9f6f5c247846"))
                        .name("name1")
                        .address("address1")
                        .nip("nip1")
                        .email("email1@example.org")
                        .phoneNumber("phoneNumber1")
                        .build(),
                Contractor.builder()
                        .id(UUID.fromString("f7bcbcd8-70cb-4a13-9f78-33f7ac774103"))
                        .name("name2")
                        .address("address2")
                        .nip("nip2")
                        .email("email2@example.org")
                        .phoneNumber("phoneNumber2")
                        .build()
        );
    }
}
