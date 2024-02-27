package pl.jakub.pawlak.api.core.contractor;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractorDto {
    private UUID id;
    private String name;
    private String nip;
    private String address;
    private String phoneNumber;
    @Email
    private String email;
}
