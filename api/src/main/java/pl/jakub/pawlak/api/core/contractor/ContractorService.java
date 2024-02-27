package pl.jakub.pawlak.api.core.contractor;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import pl.jakub.pawlak.api.core.common.NameValidatorRequest;
import pl.jakub.pawlak.api.persistance.ContractorRepository;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractorService {

    private final ContractorRepository repository;
    private final ModelMapper modelMapper;

    public List<ContractorDto> findAll() {
        log.info("Start finding all Contractors");
        final var contractorDtos = repository.findAll().stream()
                .map(contractor -> modelMapper.map(contractor, ContractorDto.class))
                .toList();
        log.info("Finished finding all Contractors. Found: {}", contractorDtos.size());
        return contractorDtos;
    }

    public ContractorDto findById(final UUID id) {
        log.info("Start finding contractor with id = {}", id);
        final var contractor = repository.findById(id);
        final var contractorDto = contractor.map(theContractor -> modelMapper.map(theContractor, ContractorDto.class))
                .orElseThrow(() -> new IllegalArgumentException("Contractor with id [" + id + "] could not be found"));
        log.info("Contractor found correctly");
        return contractorDto;
    }

    public void add(final ContractorRequestBody requestBody) {
        log.info("Start adding new Contractor: {}", requestBody);

        var contractor = modelMapper.map(requestBody, Contractor.class);
        contractor = repository.save(contractor);

        log.info("End of adding new Contractor: {}", contractor);
    }

    @Transactional
    public void update(final UUID id, final ContractorRequestBody requestBody) {
        log.info("Start updating Contractor: id: {}, reqBody: {}", id, requestBody);

        final var contractor = get(id);
        contractor.setName(requestBody.getName());
        contractor.setNip(requestBody.getNip());
        contractor.setEmail(requestBody.getEmail());
        contractor.setAddress(requestBody.getAddress());
        contractor.setPhoneNumber(requestBody.getPhoneNumber());

        log.info("Finished updating Contractor: id: {}, entity: {}", id, contractor);
    }

    public boolean validateName(NameValidatorRequest request) {
        return !repository.existsByName(request.getName());
    }

    public void delete(final UUID id) {
        log.info("Start removing Contractor: id: {}", id);
        repository.deleteById(id);
        log.info("Finished removing Contractor: id: {}", id);
    }

    private Contractor get(final UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Cannot find Contractor with id: " + id));
    }
}
