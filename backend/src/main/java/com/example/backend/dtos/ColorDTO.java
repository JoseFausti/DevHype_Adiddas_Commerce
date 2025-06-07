// ColorDTO.java
package com.example.backend.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ColorDTO {
    private Long id;
    private String name;
}