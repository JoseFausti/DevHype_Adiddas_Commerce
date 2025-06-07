// DiscountDTO.java
package com.example.backend.dtos;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscountDTO {
    private Long id;
    private double percentage;
    private LocalDate initialDate;
    private LocalDate finalDate;
}