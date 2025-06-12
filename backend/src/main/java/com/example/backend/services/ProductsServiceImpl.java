package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.productVariants.CreateUpdateProductVariantDTO;
import com.example.backend.dtos.products.CreateUpdateProductDTO;
import com.example.backend.dtos.products.ProductDTO;
import com.example.backend.mappers.ProductMapper;
import com.example.backend.models.entities.Categories;
import com.example.backend.models.entities.Colors;
import com.example.backend.models.entities.Discounts;
import com.example.backend.models.entities.ProductVariants;
import com.example.backend.models.entities.Products;
import com.example.backend.models.entities.Sizes;
import com.example.backend.repositories.BaseRepository;
import com.example.backend.repositories.CategoriesRepository;
import com.example.backend.repositories.ColorsRepository;
import com.example.backend.repositories.DiscountsRepository;
import com.example.backend.repositories.ProductsRepository;
import com.example.backend.repositories.SizesRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductsServiceImpl extends BaseServiceImpl<Products, Long> implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private CategoriesRepository categoryRepository;

    @Autowired
    private DiscountsRepository discountRepository;

    @Autowired
    private SizesRepository sizeRepository;

    @Autowired
    private ColorsRepository colorRepository;

    public ProductsServiceImpl(BaseRepository<Products, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public ProductDTO getById(Long id) throws Exception {
        Products product = super.findById(id);
        return ProductMapper.toDto(product);
    }

    @Transactional
    public List<ProductDTO> getAll() throws Exception {
        List<Products> products = super.findAll();
        return products.stream().map(ProductMapper::toDto).toList();
    }

    @Transactional
    public ProductDTO save(CreateUpdateProductDTO dto) throws Exception {
        Products product = new Products();

        product.setName(dto.getName());
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());

        Categories category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new Exception("Category not found"));
        product.setCategory(category);

        if (dto.getDiscountPercentages() != null && !dto.getDiscountPercentages().isEmpty()) {
            List<Discounts> discounts = new ArrayList<>();
            for (Double percentage : dto.getDiscountPercentages()) {
                Discounts discount = discountRepository.findByPercentage(percentage)
                        .orElseThrow(() -> new Exception("Discount not found with percentage: " + percentage));
                discounts.add(discount);
            }
            product.setDiscounts(discounts);
        } else {
            product.setDiscounts(new ArrayList<>());
        }

        if (dto.getProductVariants() != null && !dto.getProductVariants().isEmpty()) {
            List<ProductVariants> variants = new ArrayList<>();
            for (CreateUpdateProductVariantDTO variantDTO : dto.getProductVariants()) {
                // Validar que el productName de la variante coincida con el producto principal
                if (!variantDTO.getProductName().equals(dto.getName())) {
                    throw new Exception("El productName de la variante '" + variantDTO.getProductName()
                        + "' no coincide con el nombre del producto principal '" + dto.getName() + "'");
                }

                ProductVariants variant = new ProductVariants();

                Sizes size = sizeRepository.findBySize(variantDTO.getSizeNumber())
                        .orElseThrow(() -> new Exception("Size not found"));
                Colors color = colorRepository.findByName(variantDTO.getColorName())
                        .orElseThrow(() -> new Exception("Color not found"));

                variant.setSize(size);
                variant.setColor(color);
                variant.setStock(variantDTO.getStock());
                variant.setProduct(product); // para la relación bidireccional

                variants.add(variant);
            }
            product.setProductVariants(variants);
        } else {
            product.setProductVariants(new ArrayList<>());
        }

        product = productsRepository.save(product);

        return ProductMapper.toDto(product);
    }

    @Transactional
    public ProductDTO update(CreateUpdateProductDTO dto, Long id) throws Exception {
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));

        product.setName(dto.getName());
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());

        // Categoría
        Categories category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new Exception("Category not found"));
        product.setCategory(category);

        // Descuentos
        List<Discounts> discounts = new ArrayList<>();
        if (dto.getDiscountPercentages() != null) {
            for (Double percentage : dto.getDiscountPercentages()) {
                Discounts discount = discountRepository.findByPercentage(percentage)
                        .orElseThrow(() -> new Exception("Discount not found with percentage: " + percentage));
                discounts.add(discount);
            }
        }
        product.setDiscounts(discounts);

        // Variantes
        // Opción 1: borrar las existentes y agregar nuevas
        product.getProductVariants().clear(); // si está en cascada, se borran de DB
        List<ProductVariants> variants = new ArrayList<>();
        if (dto.getProductVariants() != null) {
            for (CreateUpdateProductVariantDTO variantDTO : dto.getProductVariants()) {
                // (opcional) Validación defensiva del nombre
                if (!variantDTO.getProductName().equals(dto.getName())) {
                    throw new Exception("Variant productName does not match main product name");
                }

                Sizes size = sizeRepository.findBySize(variantDTO.getSizeNumber())
                        .orElseThrow(() -> new Exception("Size not found: " + variantDTO.getSizeNumber()));
                Colors color = colorRepository.findByName(variantDTO.getColorName())
                        .orElseThrow(() -> new Exception("Color not found: " + variantDTO.getColorName()));

                ProductVariants variant = new ProductVariants();
                variant.setSize(size);
                variant.setColor(color);
                variant.setStock(variantDTO.getStock());
                variant.setProduct(product); // relación bidireccional

                variants.add(variant);
            }
        }
        product.setProductVariants(variants);

        // Guardar
        Products updated = productsRepository.save(product);
        return ProductMapper.toDto(updated);
    }
}
