package pl.jakub.pawlak.api.core.contractor;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@ToString
@Entity
@Builder
@Table(name = "contractors")
@NoArgsConstructor
@AllArgsConstructor
public class Contractor {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @Column(name = "nip")
    private String nip;
    @Column(name = "postal_address") // street and number
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Email
    @Column(name = "email")
    private String email;
}
