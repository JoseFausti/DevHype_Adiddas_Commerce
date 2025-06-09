// DirectionsDTO.java
package com.example.backend.dtos;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DirectionsDTO {
    private Long id;
    private String street;
    private int number;
    private String locality;
    private String city;
    private String country;
    private int postalCode;
}