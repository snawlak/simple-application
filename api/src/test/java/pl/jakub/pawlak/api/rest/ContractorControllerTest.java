package pl.jakub.pawlak.api.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import pl.jakub.pawlak.api.core.contractor.ContractorDto;
import pl.jakub.pawlak.api.core.contractor.ContractorRequestBody;
import pl.jakub.pawlak.api.core.contractor.ContractorService;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest({ContractorController.class})
class ContractorControllerTest {

    @MockBean
    private ContractorService service;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldFindAll() throws Exception {
        // given
        when(service.findAll()).thenReturn(List.of());

        // when & then
        mvc.perform(get("/contractors"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void shouldFindById() throws Exception {
        // given
        final var id = "f9e87bad-b128-49f3-b2b3-9f6f5c247846";
        final var contractorDto = new ContractorDto(UUID.fromString(id), "name", "nip", "address", "phoneNumber", "email@example.org");
        when(service.findById(UUID.fromString(id))).thenReturn(contractorDto);

        // when & then
        mvc.perform(get("/contractors/" + id))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                                  {
                                                      "id":"f9e87bad-b128-49f3-b2b3-9f6f5c247846",
                                                      "name":"name",
                                                      "nip":"nip",
                                                      "address":"address",
                                                      "phoneNumber":"phoneNumber",
                                                      "email":"email@example.org"
                                                  }
                                                  """));
    }

    @Test
    void shouldAdd() throws Exception {
        // given
        final var requestBody = new ContractorRequestBody("name", "nip", "address", "phoneNumber", "email@example.org");
        doNothing().when(service).add(any());

        // when & then
        mvc.perform(post("/contractors")
                            .contentType(APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldUpdate() throws Exception {
        // given
        final var id = "f9e87bad-b128-49f3-b2b3-9f6f5c247846";
        final var requestBody = new ContractorRequestBody("name", "nip", "address", "phoneNumber", "email@example.org");
        doNothing().when(service).update(any(), any());

        // when & then
        mvc.perform(put("/contractors/" + id)
                            .contentType(APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isNoContent());
    }
}
