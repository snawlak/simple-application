package pl.jakub.pawlak.api.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jakub.pawlak.api.core.common.NameValidatorRequest;
import pl.jakub.pawlak.api.core.contractor.ContractorDto;
import pl.jakub.pawlak.api.core.contractor.ContractorRequestBody;
import pl.jakub.pawlak.api.core.contractor.ContractorService;

import java.util.List;
import java.util.UUID;

@Valid
@RestController
@RequiredArgsConstructor
@RequestMapping("contractors")
public class ContractorController {

    private final ContractorService service;

    @GetMapping
    public ResponseEntity<List<ContractorDto>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<ContractorDto> findById(@PathVariable("id") final UUID id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody @Valid final ContractorRequestBody requestBody) {
        service.add(requestBody);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable("id") final UUID id,
                                       @RequestBody @Valid final ContractorRequestBody requestBody) {
        service.update(id, requestBody);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/name/is-valid")
    public ResponseEntity<Boolean> validateName(@RequestBody final NameValidatorRequest request) {
        return ResponseEntity.ok(service.validateName(request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") final UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
