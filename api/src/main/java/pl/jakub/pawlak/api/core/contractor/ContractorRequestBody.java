package pl.jakub.pawlak.api.core.contractor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class ContractorRequestBody {
    @NotNull
    private String name;
    private String nip;
    private String address;
    private String phoneNumber;
    @Email
    private String email;
}
